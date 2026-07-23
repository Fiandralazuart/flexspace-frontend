"use client";

import { Building2, Clock3, Users } from "lucide-react";

import { useOccupancySummary } from "@/components/hooks/useAnalitics";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SummaryCards = () => {
	const { data, isLoading } = useOccupancySummary();

	if (isLoading) {
		return (
			<div className="grid gap-4 md:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					<Card key={index}>
						<CardContent className="p-6">
							<Skeleton className="h-5 w-28" />

							<Skeleton className="mt-2 h-4 w-36" />

							<div className="mt-6 flex items-center justify-between">
								<Skeleton className="h-10 w-24" />

								<Skeleton className="h-14 w-14 rounded-2xl" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	const cards = [
		{
			title: "Average People",
			description: "Average occupancy",
			value: data?.averagePeople ?? 0,
			suffix: " people",
			icon: Users,
			bg: "bg-blue-100 dark:bg-blue-500/10",
			color: "text-blue-600",
		},
		{
			title: "Peak Hour",
			description: "Highest activity",
			value:
				data?.peakHour !== null
					? `${String(data?.peakHour).padStart(2, "0")}:00`
					: "-",
			icon: Clock3,
			bg: "bg-amber-100 dark:bg-amber-500/10",
			color: "text-amber-600",
		},
		{
			title: "Spaces Monitored",
			description: "Active spaces",
			value: data?.spacesMonitored ?? 0,
			icon: Building2,
			bg: "bg-emerald-100 dark:bg-emerald-500/10",
			color: "text-emerald-600",
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{cards.map((card) => (
				<Card
					key={card.title}
					className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					<CardContent className="p-6">
						<div className="flex items-start justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									{card.title}
								</p>

								<p className="mt-1 text-xs text-muted-foreground">
									{card.description}
								</p>
							</div>

							<div
								className={cn(
									"rounded-2xl p-4",
									card.bg,
								)}
							>
								<card.icon
									className={cn(
										"h-7 w-7",
										card.color,
									)}
								/>
							</div>
						</div>

						<div className="mt-8">
							<h2 className="text-4xl font-bold tracking-tight">
								{card.value}
								{"suffix" in card ? card.suffix : ""}
							</h2>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default SummaryCards;