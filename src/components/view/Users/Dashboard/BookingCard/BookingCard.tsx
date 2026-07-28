"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import ProgressCard from "./ProgressCard";
import useBooking from "./useBookingCard";
import { BookingStatus, IBooking } from "@/types/booking";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarX2 } from "lucide-react";

const BookingCard = () => {
	const { dataBooking, isLoadingBooking } = useBooking();

	const bookingStatusBadge = (status: BookingStatus) => {
		switch (status) {
			case BookingStatus.PENDING:
				return "border-amber-200 bg-amber-50 text-amber-700";

			case BookingStatus.APPROVED:
				return "border-emerald-200 bg-emerald-50 text-emerald-700";

			case BookingStatus.RELOCATED:
				return "border-violet-200 bg-violet-50 text-violet-700";

			case BookingStatus.COMPLETED:
				return "border-blue-200 bg-blue-50 text-blue-700";

			case BookingStatus.REJECTED:
				return "border-red-200 bg-red-50 text-red-700";

			case BookingStatus.CANCELLED:
				return "border-slate-200 bg-slate-100 text-slate-600";

			default:
				return "";
		}
	};
	console.log(dataBooking);

	return (
		<>
			<div>
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-lg font-semibold">
							Recent Booking
						</h2>

						<p className="text-sm text-muted-foreground">
							Reserve space for your schedule
						</p>
					</div>
				</div>
			</div>
			{!dataBooking?.data?.length ? (
				<div className="flex justify-center py-8">
					<Card className="w-full max-w-3xl border border-dashed border-emerald-200 shadow-none">
						<CardContent className="flex flex-col gap-5 py-12 text-center md:flex-row md:items-center md:justify-between md:text-left">
							<div className="flex items-center gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
									<CalendarX2 className="h-8 w-8 text-emerald-600" />
								</div>

								<div>
									<h2 className="text-xl font-semibold">
										No Reservations Yet
									</h2>

									<p className="mt-1 max-w-md text-sm text-muted-foreground">
										You haven't booked any spaces yet.
										Browse available spaces and reserve one
										for your next meeting or activity.
									</p>
								</div>
							</div>

							<Link href="/spaces">
								<Button className="rounded-2xl p-4 text-xs font-semibold bg-blue-600 hover:bg-emerald-700">
									Book Space
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			) : (
				<div className="space-y-6">
					{dataBooking.data.map((booking: IBooking) => (
						<Card
							key={booking.id}
							className="border-emerald-100 shadow-none"
						>
							<CardContent className="space-y-6 p-6">
								<div className="flex items-start justify-between">
									<div>
										<h2 className="text-xl font-semibold">
											{booking.title}
										</h2>

										<p className="text-sm text-muted-foreground">
											{booking.space.name}
										</p>
									</div>

									<Badge
										className={cn(
											"rounded-full border px-3 py-1 text-xs font-semibold",
											bookingStatusBadge(booking.status),
										)}
									>
										{booking.status}
									</Badge>
								</div>

								<div className="grid grid-cols-3 gap-4">
									<div>
										<p className="text-xs text-muted-foreground">
											Date
										</p>

										<p className="font-medium">
											{new Date(
												booking.startTime,
											).toLocaleDateString("id-ID", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
										</p>
									</div>

									<div>
										<p className="text-xs text-muted-foreground">
											Time
										</p>

										<p className="font-medium">
											{new Date(
												booking.startTime,
											).toLocaleTimeString("id-ID", {
												hour: "2-digit",
												minute: "2-digit",
											})}
											{" - "}
											{new Date(
												booking.endTime,
											).toLocaleTimeString("id-ID", {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
									</div>

									<div>
										<p className="text-xs text-muted-foreground">
											Location
										</p>

										<div className="flex items-center gap-2">
											<p className="font-medium">
												{booking.space.name}
											</p>

											<p className="text-sm text-muted-foreground">
												Floor {booking.space.floor}
											</p>
										</div>
									</div>
								</div>

								<ProgressCard status={booking.status} />
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</>
	);
};

export default BookingCard;
