"use client";

import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { useOccupancyTrend } from "@/components/hooks/useAnalitics";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (
	date: string,
	options: Intl.DateTimeFormatOptions,
) => {
	return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

interface OccupancyTrend {
	date: string;
	averagePeople: number;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: {
		value: number;
	}[];
	label?: string;
}

const CustomTooltip = ({
	active,
	payload,
	label,
}: CustomTooltipProps) => {
	if (!active || !payload?.length) return null;

	return (
		<div className="rounded-xl border bg-background px-4 py-3 shadow-xl">
			<p className="text-xs text-muted-foreground">
				{formatDate(label ?? "", {
					day: "2-digit",
					month: "long",
					year: "numeric",
				})}
			</p>

			<div className="mt-2 flex items-center gap-2">
				<div className="h-3 w-3 rounded-full bg-blue-600" />

				<p className="text-sm font-medium">
					Average People
				</p>
			</div>

			<p className="mt-2 text-2xl font-bold">
				{Number(payload[0].value).toFixed(1)}
			</p>
		</div>
	);
};

const TrendChart = () => {
	const { data, isLoading } = useOccupancyTrend();

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Occupancy Trend</CardTitle>
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
					<CardTitle>Occupancy Trend</CardTitle>
				</CardHeader>

				<CardContent className="flex h-80 items-center justify-center text-muted-foreground">
					No occupancy data available.
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">
					Occupancy Trend
				</CardTitle>

				<p className="text-sm text-muted-foreground">
					Last 7 Days
				</p>
			</CardHeader>

			<CardContent>
				<div className="h-80">
					<ResponsiveContainer
						width="100%"
						height="100%"
					>
						<AreaChart
							data={data}
							margin={{
								top: 10,
								right: 20,
								left: -20,
								bottom: 0,
							}}
						>
							<defs>
								<linearGradient
									id="occupancyGradient"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="#2563EB"
										stopOpacity={0.35}
									/>

									<stop
										offset="95%"
										stopColor="#2563EB"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>

							<CartesianGrid
								stroke="#E5E7EB"
								strokeDasharray="4 4"
								vertical={false}
							/>

							<XAxis
								dataKey="date"
								axisLine={false}
								tickLine={false}
								tickMargin={12}
								minTickGap={30}
								tickFormatter={(value) =>
									formatDate(value, {
										day: "2-digit",
										month: "short",
									})
								}
							/>

							<YAxis
								axisLine={false}
								tickLine={false}
								tickMargin={10}
							/>

							<Tooltip content={<CustomTooltip />} />

							<Area
								type="monotone"
								dataKey="averagePeople"
								stroke="#2563EB"
								strokeWidth={3}
								fill="url(#occupancyGradient)"
								dot={false}
								activeDot={{
									r: 6,
									fill: "#2563EB",
									stroke: "#fff",
									strokeWidth: 3,
								}}
								isAnimationActive
								animationDuration={900}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default TrendChart;