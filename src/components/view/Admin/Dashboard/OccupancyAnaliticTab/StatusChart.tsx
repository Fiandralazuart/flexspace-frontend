"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

import { useOccupancyStatus } from "@/components/hooks/useAnalitics";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OccupancyStatus {
	occupancyStatus: string;
	total: number;
}

const STATUS_CONFIG: Record<
	string,
	{
		color: string;
		label: string;
	}
> = {
	EMPTY: {
		color: "#10B981",
		label: "Empty",
	},
	OCCUPIED: {
		color: "#3B82F6",
		label: "Occupied",
	},
	FULL: {
		color: "#F59E0B",
		label: "Full",
	},
	OVER_CAPACITY: {
		color: "#EF4444",
		label: "Over Capacity",
	},
};

interface CustomTooltipProps {
	active?: boolean;
	payload?: {
		value: number;
		payload: OccupancyStatus;
	}[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
	if (!active || !payload?.length) return null;

	return (
		<div className="rounded-lg border bg-background p-3 shadow-lg">
			<p className="font-semibold">
				{payload[0].payload.occupancyStatus}
			</p>

			<p className="mt-2 text-sm">
				Total :
				<span className="ml-2 font-semibold">{payload[0].value}</span>
			</p>
		</div>
	);
};

const StatusChart = () => {
	const { data, isLoading } = useOccupancyStatus();

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Occupancy Status</CardTitle>
				</CardHeader>

				<CardContent>
					<Skeleton className="h-80 w-full rounded-xl" />
				</CardContent>
			</Card>
		);
	}

	if (!data || data.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Occupancy Status</CardTitle>
				</CardHeader>

				<CardContent className="flex h-80 items-center justify-center text-muted-foreground">
					No status data available.
				</CardContent>
			</Card>
		);
	}

	console.log(data);

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">Occupancy Status</CardTitle>

				<p className="text-sm text-muted-foreground">
					Current Space Distribution
				</p>
			</CardHeader>

			<CardContent>
				<div className="grid h-80 grid-cols-5 gap-6">
					<div className="col-span-2">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={data}
									dataKey="total"
									nameKey="status"
									cx="50%"
									cy="50%"
									innerRadius={65}
									outerRadius={95}
									paddingAngle={4}
									stroke="white"
									strokeWidth={2}
								>
									{data.map(
										(
											item: OccupancyStatus,
											index: number,
										) => (
											<Cell
												key={item.occupancyStatus}
												fill={
													STATUS_CONFIG[
														item.occupancyStatus
													]?.color ?? "#94A3B8"
												}
											/>
										),
									)}
								</Pie>

								<Tooltip content={<CustomTooltip />} />

								<text
									x="50%"
									y="46%"
									textAnchor="middle"
									className="fill-foreground text-3xl font-bold"
								>
									{data.reduce(
										(sum: number, item: OccupancyStatus) =>
											sum + item.total,
										0,
									)}
								</text>

								<text
									x="50%"
									y="57%"
									textAnchor="middle"
									className="fill-muted-foreground text-sm"
								>
									Spaces
								</text>
							</PieChart>
						</ResponsiveContainer>
					</div>

					<div className="col-span-3 flex flex-col justify-center space-y-5">
						{data.map((item: OccupancyStatus, index: number) => {
							const total = data.reduce(
								(sum: number, current: OccupancyStatus) =>
									sum + current.total,
								0,
							);

							const percentage =
								total > 0 ? (item.total / total) * 100 : 0;

							return (
								<div
									key={item.occupancyStatus}
									className="space-y-2"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div
												className="h-3 w-3 rounded-full"
												style={{
													background:
														STATUS_CONFIG[
															item.occupancyStatus
														]?.color ?? "#94A3B8",
												}}
											/>

											<p className="text-sm font-medium capitalize">
												{item.occupancyStatus
													.replaceAll("_", " ")
													.toLowerCase()}
											</p>
										</div>

										<p className="text-sm font-semibold">
											{percentage.toFixed(0)}%
										</p>
									</div>

									<div className="h-2 w-full overflow-hidden rounded-full bg-muted">
										<div
											className="h-full rounded-full transition-all duration-700"
											style={{
												width: `${percentage}%`,
												background:
													STATUS_CONFIG[
														item.occupancyStatus
													]?.color ?? "#94A3B8",
											}}
										/>
									</div>

									<div className="flex justify-between text-xs text-muted-foreground">
										<span>{item.total} spaces</span>

										<span>{percentage.toFixed(1)}%</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default StatusChart;
