"use client";

import { Building2, Crown, Medal, Trophy, Users } from "lucide-react";

import { useTopSpaces } from "@/components/hooks/useAnalitics";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TopSpace {
	spaceId: string;
	spaceName: string;
	averagePeople: number;
}

const getRankIcon = (index: number) => {
	switch (index) {
		case 0:
			return <Crown className="h-5 w-5 text-yellow-500" />;

		case 1:
			return <Trophy className="h-5 w-5 text-slate-500" />;

		case 2:
			return <Medal className="h-5 w-5 text-orange-500" />;

		default:
			return (
				<div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
					{index + 1}
				</div>
			);
	}
};

const getProgressColor = (rank: number) => {
	switch (rank) {
		case 0:
			return "bg-yellow-500";

		case 1:
			return "bg-slate-500";

		case 2:
			return "bg-orange-500";

		default:
			return "bg-primary";
	}
};

const TopSpacesTable = () => {
	const { data, isLoading } = useTopSpaces();

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Top Spaces</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					{Array.from({
						length: 5,
					}).map((_, index) => (
						<Skeleton
							key={index}
							className="h-20 w-full rounded-xl"
						/>
					))}
				</CardContent>
			</Card>
		);
	}

	if (!data?.length) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Top Spaces</CardTitle>
				</CardHeader>

				<CardContent className="flex h-72 items-center justify-center text-muted-foreground">
					No data available.
				</CardContent>
			</Card>
		);
	}

	const maxAverage = Math.max(...data.map((item: TopSpace) => item.averagePeople));

	return (
		<Card className="border-0 shadow-sm">
			<CardHeader className="pb-2">
				<CardTitle>Top Spaces</CardTitle>

				<p className="text-sm text-muted-foreground">
					Most occupied spaces based on average people
				</p>
			</CardHeader>

			<CardContent className="space-y-5">
				{data.map((space: TopSpace, index: number) => {
					const width = (space.averagePeople / maxAverage) * 100;

					return (
						<div
							key={space.spaceId}
							className="space-y-2 rounded-xl border p-4 transition-all hover:bg-muted/40"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									{getRankIcon(index)}

									<div className="rounded-lg bg-primary/10 p-2">
										<Building2 className="h-4 w-4 text-primary" />
									</div>

									<div>
										<p className="font-semibold">
											{space.spaceName}
										</p>

										<p className="text-xs text-muted-foreground">
											Average occupancy
										</p>
									</div>
								</div>

								<div className="flex items-center gap-2 text-sm font-semibold">
									<Users className="h-4 w-4 text-muted-foreground" />

									{space.averagePeople}
								</div>
							</div>

							<div className="h-2 overflow-hidden rounded-full bg-muted">
								<div
									className={`h-full transition-all duration-700 ${getProgressColor(index)}`}
									style={{
										width: `${width}%`,
									}}
								/>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
};

export default TopSpacesTable;
