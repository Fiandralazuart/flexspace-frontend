"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { CalendarDays, Clock3, MapPin, User } from "lucide-react";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { BookingStatus, IBooking } from "@/types/booking";
import SummaryCard from "./modalCard/SummaryCard";
import ProgressStepper from "./modalCard/ProgressCard";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import useUpdateBooking from "./useReviewModal";
import { ISpace } from "@/types/space";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	booking: IBooking | null;
	refetchBooking: () => void;
}

const ReviewBookingModal = ({
	open,
	onOpenChange,
	booking,
	refetchBooking,
}: Props) => {
	const {
		control,
		errors,
		handleSubmit,
		reset,

		spaces,
		isLoadingSpaces,

		handleUpdateBooking,

		isPendingUpdateBooking,
		isSuccessUpdateBooking,
	} = useUpdateBooking({
		id: booking?.id ?? "",
		spaceId: booking?.spaceId ?? "",
		status: booking?.status ?? BookingStatus.PENDING,
		adminNote: booking?.adminNote,
	});
	useEffect(() => {
		if (open && booking) {
			reset({
				spaceId: booking.spaceId,
				status: booking.status,
				adminNote: booking.adminNote ?? "",
			});
		}
	}, [open, booking, reset]);

	useEffect(() => {
		if (isSuccessUpdateBooking) {
			refetchBooking();
			onOpenChange(false);
		}
	}, [isSuccessUpdateBooking, refetchBooking, onOpenChange]);

	if (!booking) return null;

	const statusBadgeClass = (status: BookingStatus) => {
		switch (status) {
			case BookingStatus.APPROVED:
				return "border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 ring-1 ring-emerald-100";

			case BookingStatus.PENDING:
				return "border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-700 ring-1 ring-amber-100";

			case BookingStatus.REJECTED:
				return "border-rose-300 bg-gradient-to-r from-rose-50 to-red-100 text-rose-700 ring-1 ring-rose-100";

			case BookingStatus.CANCELLED:
				return "border-orange-300 bg-gradient-to-r from-orange-50 to-amber-100 text-orange-700 ring-1 ring-orange-100";

			case BookingStatus.COMPLETED:
				return "border-sky-300 bg-gradient-to-r from-sky-50 to-blue-100 text-sky-700 ring-1 ring-sky-100";

			default:
				return "";
		}
	};

	const selectedSpace = spaces?.find(
		(space: ISpace) => space.id === booking.spaceId,
	);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex w-[95vw] max-h-[88vh] flex-col overflow-hidden rounded-3xl p-0 sm:!max-w-[860px]">
				<div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-6 py-4">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-5">
							<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
								<CalendarDays className="h-7 w-7 text-emerald-600" />
							</div>

							<div>
								<h2 className="text-3xl font-bold">
									{booking.title}
								</h2>

								<p className="mt-2 text-muted-foreground">
									{booking.space.name} •{" "}
									{new Date(
										booking.startTime,
									).toLocaleDateString("id-ID")}{" "}
									•{" "}
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
						</div>

						<Badge
							className={cn(
								"rounded-full border px-2 py-3 text-sm font-semibold shadow-sm",
								statusBadgeClass(booking.status),
							)}
						>
							{booking.status}
						</Badge>
					</div>
				</div>

				<div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
					{/* Summary */}
					<div className="grid grid-cols-4 gap-3">
						<SummaryCard
							icon={User}
							title="Booked By"
							value={booking.user.name}
						/>

						<SummaryCard
							icon={MapPin}
							title="Room"
							value={booking.space.name}
						/>

						<SummaryCard
							icon={Clock3}
							title="Start Time"
							value={`${new Date(
								booking.startTime,
							).toLocaleDateString("id-ID", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							})} • ${new Date(
								booking.startTime,
							).toLocaleTimeString("id-ID", {
								hour: "2-digit",
								minute: "2-digit",
							})} WIB`}
						/>

						<SummaryCard
							icon={Clock3}
							title="End Time"
							value={`${new Date(
								booking.endTime,
							).toLocaleDateString("id-ID", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							})} • ${new Date(
								booking.endTime,
							).toLocaleTimeString("id-ID", {
								hour: "2-digit",
								minute: "2-digit",
							})} WIB`}
						/>
					</div>

					<ProgressStepper status={booking.status} />

					<div className="grid grid-cols-5 gap-4">
						<Card className="col-span-2 border-emerald-100 shadow-none">
							<CardContent className="flex h-full flex-col p-5">
								<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
									Description
								</p>

								<div className="rounded-xl bg-slate-50 p-4">
									<p className="text-sm leading-7 text-slate-700">
										{booking.description ||
											"No description provided."}
									</p>
								</div>

								{booking.reviewedBy && (
									<div className="mt-5 border-t pt-4">
										<p className="text-sm font-medium">
											Last Reviewed
										</p>

										<p className="text-sm text-muted-foreground">
											{booking.reviewedBy.name}
										</p>

										{booking.reviewedAt && (
											<p className="text-xs text-muted-foreground">
												{new Date(
													booking.reviewedAt,
												).toLocaleString("id-ID")}
											</p>
										)}
									</div>
								)}
							</CardContent>
						</Card>

						<Card className="col-span-3 border-emerald-100 shadow-none">
							<CardContent className="space-y-4 p-4">
								<div>
									<Label className="mb-2 block">Space</Label>

									{!isLoadingSpaces && spaces && (
										<Controller
											name="spaceId"
											control={control}
											render={({ field }) => {
												const selectedSpace =
													spaces.find(
														(space: ISpace) =>
															space.id ===
															field.value,
													);

												return (
													<Select
														value={
															field.value ?? ""
														}
														onValueChange={
															field.onChange
														}
													>
														<SelectTrigger className="h-11 rounded-xl border-emerald-200">
															<SelectValue>
																{selectedSpace?.name ??
																	"Select Space"}
															</SelectValue>
														</SelectTrigger>

														<SelectContent>
															{spaces.map(
																(
																	space: ISpace,
																) => (
																	<SelectItem
																		key={
																			space.id
																		}
																		value={
																			space.id
																		}
																	>
																		{
																			space.name
																		}
																	</SelectItem>
																),
															)}
														</SelectContent>
													</Select>
												);
											}}
										/>
									)}

									{errors.spaceId && (
										<p className="mt-2 text-sm text-red-500">
											{errors.spaceId.message}
										</p>
									)}
								</div>

								<div>
									<Label className="mb-2 block">
										Booking Status
									</Label>

									<Controller
										name="status"
										control={control}
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="h-11 rounded-xl border-emerald-200">
													<SelectValue />
												</SelectTrigger>

												<SelectContent>
													{Object.values(
														BookingStatus,
													).map((status) => (
														<SelectItem
															key={status}
															value={status}
														>
															{status}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>

									{errors.status && (
										<p className="mt-2 text-sm text-red-500">
											{errors.status.message}
										</p>
									)}
								</div>

								<div>
									<Label className="mb-2 block">
										Admin Note
									</Label>

									<Controller
										name="adminNote"
										control={control}
										render={({ field }) => (
											<Textarea
												rows={3}
												className="resize-none rounded-xl"
												placeholder="Write an admin note..."
												{...field}
											/>
										)}
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<DialogFooter className="border-t bg-white px-6  mb-2 sm:justify-end">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>

					<Button
						className="bg-emerald-600 hover:bg-emerald-700"
						onClick={handleSubmit(handleUpdateBooking)}
						disabled={isPendingUpdateBooking}
					>
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ReviewBookingModal;
