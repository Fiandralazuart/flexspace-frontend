"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { usePeakHour } from "@/components/hooks/useAnalitics";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PeakHour {
	hour: number;
	averagePeople: number;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: {
		value: number;
		payload: PeakHour;
	}[];
	label?: number;
}

const getBarColor = (value: number) => {
	if (value >= 6) return "#EF4444";
	if (value >= 3) return "#F59E0B";

	return "#3B82F6";
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (!active || !payload?.length) return null;

	return (
		<div className="rounded-xl border bg-background px-4 py-3 shadow-xl">
			<p className="text-xs text-muted-foreground">{label}:00</p>

			<div className="mt-2 flex items-center gap-2">
				<div
					className="h-3 w-3 rounded-full"
					style={{
						background: getBarColor(Number(payload[0].value)),
					}}
				/>

				<p className="text-sm font-medium">Average People</p>
			</div>

			<p className="mt-2 text-2xl font-bold">
				{Number(payload[0].value).toFixed(1)}
			</p>
		</div>
	);
};

const PeakHourChart = () => {
	const { data, isLoading } = usePeakHour();

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Peak Hour</CardTitle>
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
					<CardTitle>Peak Hour</CardTitle>
				</CardHeader>

				<CardContent className="flex h-80 items-center justify-center text-muted-foreground">
					No peak hour data available.
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">Peak Hour</CardTitle>

				<p className="text-sm text-muted-foreground">
					Average Occupancy by Hour
				</p>
			</CardHeader>

			<CardContent>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={data}
							margin={{
								top: 10,
								right: 20,
								left: -20,
								bottom: 0,
							}}
						>
							<CartesianGrid
								stroke="#E5E7EB"
								strokeDasharray="4 4"
								vertical={false}
							/>

							<XAxis
								dataKey="hour"
								axisLine={false}
								tickLine={false}
								tickMargin={12}
								tickFormatter={(value) => `${value}:00`}
							/>

							<YAxis
								axisLine={false}
								tickLine={false}
								tickMargin={10}
							/>

							<Tooltip content={<CustomTooltip />} />

							<Bar
								dataKey="averagePeople"
								radius={[8, 8, 0, 0]}
								animationDuration={900}
							>
								{data.map((item: PeakHour, index: number) => (
									<Cell
										key={index}
										fill={getBarColor(item.averagePeople)}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default PeakHourChart;
