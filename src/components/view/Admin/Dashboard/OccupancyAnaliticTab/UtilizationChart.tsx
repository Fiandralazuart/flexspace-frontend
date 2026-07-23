"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	LabelList,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { useUtilization } from "@/components/hooks/useAnalitics";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SpaceUtilization {
	spaceName: string;
	averagePeople: number;
	utilization: number;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: {
		value: number;
		payload: SpaceUtilization;
	}[];
}

const getUtilizationColor = (value: number) => {
	if (value >= 90) return "#EF4444";
	if (value >= 70) return "#F59E0B";
	if (value >= 40) return "#3B82F6";

	return "#10B981";
};

const getUtilizationStatus = (value: number) => {
	if (value >= 90) return "Critical";
	if (value >= 70) return "High";
	if (value >= 40) return "Medium";

	return "Low";
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
	if (!active || !payload?.length) return null;

	const space = payload[0].payload;

	return (
		<div className="min-w-[220px] rounded-xl border bg-background p-4 shadow-xl">
			<div className="mb-3 flex items-center justify-between">
				<h4 className="font-semibold">{space.spaceName}</h4>

				<span
					className="rounded-full px-2 py-1 text-xs font-semibold text-white"
					style={{
						background: getUtilizationColor(space.utilization),
					}}
				>
					{getUtilizationStatus(space.utilization)}
				</span>
			</div>

			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Utilization</span>

					<span className="font-semibold">{space.utilization}%</span>
				</div>

				<div className="flex justify-between">
					<span className="text-muted-foreground">
						Average People
					</span>

					<span className="font-semibold">{space.averagePeople}</span>
				</div>
			</div>
		</div>
	);
};

const UtilizationChart = () => {
	const { data, isLoading } = useUtilization();

	if (isLoading) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Space Utilization</CardTitle>

					<p className="text-sm text-muted-foreground">
						Average room utilization based on capacity
					</p>
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
					<CardTitle>Space Utilization</CardTitle>
				</CardHeader>

				<CardContent className="flex h-80 items-center justify-center text-muted-foreground">
					No utilization data available.
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-2">
				<CardTitle>Space Utilization</CardTitle>

				<p className="text-sm text-muted-foreground">
					Current occupancy compared to room capacity
				</p>
			</CardHeader>

			<CardContent>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							layout="vertical"
							data={data}
							margin={{
								top: 10,
								right: 30,
								left: 20,
								bottom: 10,
							}}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="#E5E7EB"
							/>

							<XAxis
								type="number"
								domain={[0, 100]}
								tickFormatter={(value) => `${value}%`}
								axisLine={false}
								tickLine={false}
							/>

							<YAxis
								type="category"
								dataKey="spaceName"
								width={120}
								axisLine={false}
								tickLine={false}
							/>

							<Tooltip content={<CustomTooltip />} />

							<Bar
								dataKey="utilization"
								radius={[0, 8, 8, 0]}
								animationDuration={900}
							>
								{data.map((item: SpaceUtilization) => (
									<Cell
										key={item.spaceName}
										fill={getUtilizationColor(
											item.utilization,
										)}
									/>
								))}

								<LabelList
									dataKey="utilization"
									position="insideRight"
									content={({
										x,
										y,
										width,
										height,
										value,
									}) => (
										<text
											x={
												(x as number) +
												(width as number) -
												10
											}
											y={
												(y as number) +
												(height as number) / 2 +
												4
											}
											textAnchor="end"
											fill="#fff"
											fontSize={12}
											fontWeight={600}
										>
											{value}%
										</text>
									)}
								/>
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="mt-6 flex flex-wrap gap-4">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-emerald-500" />

						<span className="text-xs text-muted-foreground">
							Low (&lt;40%)
						</span>
					</div>

					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-blue-500" />

						<span className="text-xs text-muted-foreground">
							Medium (40–69%)
						</span>
					</div>

					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-amber-500" />

						<span className="text-xs text-muted-foreground">
							High (70–89%)
						</span>
					</div>

					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-red-500" />

						<span className="text-xs text-muted-foreground">
							Critical (≥90%)
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default UtilizationChart;
