"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DataTable from "@/components/common/DataTable";
import useDebounce from "@/components/hooks/useDebounce";
import useQueryParams from "@/components/hooks/useQueryParams";
import { useRouter } from "next/navigation";
import useBooking from "./useBooking";
import { IBooking, BookingStatus } from "@/types/booking";
import { COLUMN_BOOKING } from "./booking.constant";
import ReviewBookingModal from "./ReviewModal";
import DeleteBookingModal from "./DeleteBookingModal";
import { cn } from "@/lib/utils";

const BookingView = () => {
	const { dataBooking, meta, refetchBooking, isLoadingGetBooking } =
		useBooking();

	const { search, limit, updateQuery } = useQueryParams();

	const debounce = useDebounce();
	const router = useRouter();

	const [openDeleteBooking, setOpenDeleteBooking] = useState(false);
	const [openReview, setOpenReview] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(
		null,
	);

	const statusBadgeClass = (status: BookingStatus) => {
		switch (status) {
			case BookingStatus.APPROVED:
				return "border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 ring-1 ring-emerald-100";

			case BookingStatus.PENDING:
				return "border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-700 ring-1 ring-amber-100";

			case BookingStatus.RELOCATED:
				return "border-violet-300 bg-gradient-to-r from-violet-50 to-purple-100 text-violet-700 ring-1 ring-violet-100";

			case BookingStatus.REJECTED:
				return "border-rose-300 bg-gradient-to-r from-rose-50 to-red-100 text-rose-700 ring-1 ring-rose-100";

			case BookingStatus.CANCELLED:
				return "border-orange-300 bg-gradient-to-r from-orange-50 to-amber-100 text-orange-700 ring-1 ring-orange-100";

			case BookingStatus.COMPLETED:
				return "border-sky-300 bg-gradient-to-r from-sky-50 to-blue-100 text-sky-700 ring-1 ring-sky-100";
		}
	};

	const renderCell = (booking: IBooking, key: keyof IBooking | "actions") => {
		switch (key) {
			case "title":
				return (
					<div>
						<p className="font-medium">{booking.title}</p>
						<p className="line-clamp-1 text-xs text-muted-foreground">
							{booking.description || "-"}
						</p>
					</div>
				);

			case "space":
				return <div className="text-center">{booking.space.name}</div>;

			case "user":
				return <div className="text-center">{booking.user.name}</div>;

			case "startTime":
				return (
					<div className="text-center">
						{new Date(booking.startTime).toLocaleString("id-ID")}
					</div>
				);

			case "endTime":
				return (
					<div className="text-center">
						{new Date(booking.endTime).toLocaleString("id-ID")}
					</div>
				);

			case "status":
				return (
					<div className="flex justify-center">
						<Badge
							variant="outline"
							className={cn(
								"rounded-full border px-2 py-1 font-medium shadow-sm transition-all",
								statusBadgeClass(booking.status),
							)}
						>
							{booking.status}
						</Badge>
					</div>
				);

			case "actions":
				return (
					<div className="flex justify-center">
						<DropdownMenu>
							<DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent">
								<MoreHorizontal className="h-4 w-4" />
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() => {
										setSelectedBooking(booking);
										setOpenReview(true);
									}}
								>
									Review
								</DropdownMenuItem>

								<DropdownMenuItem
									className="text-red-600"
									onClick={() => {
										setSelectedBooking(booking);
										setOpenDeleteBooking(true);
									}}
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);

			default:
				return String(booking[key as keyof IBooking] ?? "-");
		}
	};

	return (
		<>
			<DataTable
				title="Booking List"
				description="Manage all bookings."
				data={dataBooking}
				columns={COLUMN_BOOKING}
				renderCell={renderCell}
				loading={isLoadingGetBooking}
				search={search}
				searchPlaceholder="Search booking..."
				onSearch={(value) =>
					debounce(() => {
						updateQuery({
							search: value,
							page: 1,
						});
					}, 500)
				}
				totalData={meta?.totalData}
				page={meta?.page}
				totalPage={meta?.totalPage}
				limit={limit}
				onLimitChange={(value) =>
					updateQuery({
						limit: value,
						page: 1,
					})
				}
				onPageChange={(page) =>
					updateQuery({
						page,
					})
				}
			/>
			<ReviewBookingModal
				open={openReview}
				onOpenChange={setOpenReview}
				booking={selectedBooking}
				refetchBooking={refetchBooking}
			/>
			<DeleteBookingModal
				open={openDeleteBooking}
				onOpenChange={setOpenDeleteBooking}
				refetchBooking={refetchBooking}
				title={selectedBooking?.title ?? ""}
				id={selectedBooking?.id ?? ""}
			/>
		</>
	);
};

export default BookingView;
