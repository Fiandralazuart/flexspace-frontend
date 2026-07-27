"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ISpace } from "@/types/space";
import { Building2, ChevronRight, MapPin, Users } from "lucide-react";
import useSpaceCard from "./useSpaceCard";

const getOccupancyInfo = (personCount: number, capacity: number) => {
	const percentage =
		capacity > 0 ? Math.round((personCount / capacity) * 100) : 0;

	const progressWidth = Math.min(percentage, 100);

	const occupancyConfig =
		personCount > capacity
			? {
					label: "Over Capacity",
					bar: "bg-red-500",
					badge: "border-red-200 bg-red-50 text-red-700",
				}
			: personCount === 0
				? {
						label: "Empty",
						bar: "bg-slate-400",
						badge: "border-slate-200 bg-slate-50 text-slate-600",
					}
				: percentage >= 80
					? {
							label: "Almost Full",
							bar: "bg-amber-500",
							badge: "border-amber-200 bg-amber-50 text-amber-700",
						}
					: {
							label: "Available",
							bar: "bg-emerald-500",
							badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
						};

	return {
		percentage,
		progressWidth,
		occupancyConfig,
	};
};

const SpaceCard = () => {
	const { dataSpace } = useSpaceCard();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Room Status</h2>

					<p className="text-sm text-muted-foreground">
						Live availability across building
					</p>
				</div>

				<div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
					<div className="h-2 w-2 rounded-full bg-emerald-500" />
					Live
				</div>
			</div>

			<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
				{dataSpace?.data?.map((space: ISpace) => {
					const { percentage, progressWidth, occupancyConfig } =
						getOccupancyInfo(
							space.personCount ?? 0,
							space.capacity ?? 0,
						);

					return (
						<Card
							key={space.id}
							className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
						>
							<CardContent className="p-4">
								{/* Header */}
								<div className="flex items-start justify-between">
									<div className="flex items-start gap-3">
										<div className="mt-0.5 rounded-lg bg-slate-100 p-2">
											<Building2 className="h-5 w-5 text-slate-600" />
										</div>

										<div>
											<h3 className="text-[15px] font-semibold text-slate-900">
												{space.name}
											</h3>

											<p className="mt-1 text-[13px] text-slate-400">
												Small Room
											</p>
										</div>
									</div>

									<div
										className={`rounded-full border px-3 py-1 text-xs font-medium ${occupancyConfig.badge}`}
									>
										{occupancyConfig.label}
									</div>
								</div>

								{/* Information */}
								<div className="mt-5 flex items-center gap-5 text-[13px] text-slate-500">
									<div className="flex items-center gap-1.5">
										<MapPin className="h-3.5 w-3.5" />
										<span>Floor {space.floor}</span>
									</div>

									<div className="flex items-center gap-1.5">
										<Users className="h-3.5 w-3.5" />
										<span>{space.capacity} People</span>
									</div>
								</div>

								{/* Live Occupancy */}
								<div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-3">
									<div className="mb-2 flex items-center justify-between">
										<p className="text-xs font-medium text-slate-500">
											Live Occupancy
										</p>

										<span className="text-xs font-semibold text-slate-700">
											{space.personCount}/{space.capacity}
										</span>
									</div>

									<div className="h-2 overflow-hidden rounded-full bg-slate-200">
										<div
											className={`h-full rounded-full transition-all duration-500 ${occupancyConfig.bar}`}
											style={{
												width: `${progressWidth}%`,
											}}
										/>
									</div>

									<div className="mt-3 flex items-center justify-between">
										<span className="text-xs text-slate-500">
											{percentage}% Occupied
										</span>

										<span
											className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${occupancyConfig.badge}`}
										>
											{occupancyConfig.label}
										</span>
									</div>
								</div>

								{/* Button */}
								<Button className="mt-5 h-10 w-full rounded-full bg-blue-600 text-sm font-medium hover:bg-blue-700">
									Book Now
									<ChevronRight className="ml-1 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default SpaceCard;
