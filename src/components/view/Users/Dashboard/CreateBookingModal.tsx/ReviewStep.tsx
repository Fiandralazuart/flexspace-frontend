"use client";

import {
	CalendarDays,
	Clock3,
	MapPin,
	FileText,
	BadgeCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ISpace } from "@/types/space";

interface Props {
	space: ISpace;
	title: string;
	description: string;
	date?: Date;
	startTime?: string;
	endTime?: string;
}

const ReviewStep = ({
	space,
	title,
	description,
	date,
	startTime,
	endTime,
}: Props) => {
	return (
		<div className="mx-auto max-w-3xl space-y-6">
			<div>
				<h2 className="text-2xl font-semibold">Review Reservation</h2>

				<p className="mt-2 text-sm text-muted-foreground">
					Please review your reservation details before submitting.
				</p>
			</div>

			<Card>
				<CardContent className="space-y-6 p-6">
					<div>
						<h3 className="text-xl font-semibold">{space.name}</h3>

						<p className="text-sm text-muted-foreground">
							Floor {space.floor}
						</p>
					</div>

					<Separator />

					<div className="grid gap-5 md:grid-cols-2">
						<div className="flex gap-3">
							<CalendarDays className="mt-1 h-5 w-5 text-emerald-600" />

							<div>
								<p className="text-sm text-muted-foreground">
									Date
								</p>

								<p className="font-medium">
									{date
										? date.toLocaleDateString("id-ID", {
												weekday: "long",
												day: "numeric",
												month: "long",
												year: "numeric",
											})
										: "-"}
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<Clock3 className="mt-1 h-5 w-5 text-emerald-600" />

							<div>
								<p className="text-sm text-muted-foreground">
									Time
								</p>

								<p className="font-medium">
									{startTime ?? "-"} - {endTime ?? "-"}
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<MapPin className="mt-1 h-5 w-5 text-emerald-600" />

							<div>
								<p className="text-sm text-muted-foreground">
									Location
								</p>

								<p className="font-medium">{space.name}</p>

								<p className="text-sm text-muted-foreground">
									Floor {space.floor}
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<BadgeCheck className="mt-1 h-5 w-5 text-emerald-600" />

							<div>
								<p className="text-sm text-muted-foreground">
									Status
								</p>

								<span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
									PENDING APPROVAL
								</span>
							</div>
						</div>
					</div>

					<Separator />

					<div className="flex gap-3">
						<FileText className="mt-1 h-5 w-5 text-emerald-600" />

						<div className="flex-1">
							<p className="text-sm text-muted-foreground">
								Meeting Title
							</p>

							<p className="font-medium">{title || "-"}</p>

							<div className="mt-5">
								<p className="text-sm text-muted-foreground">
									Description
								</p>

								<p className="mt-1 whitespace-pre-line">
									{description || "-"}
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
						<p className="text-sm text-amber-700">
							Your reservation will be submitted with
							<strong> Pending </strong>
							status and requires administrator approval before it
							can be used.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReviewStep;
