import { Column } from "@/components/common/DataTable/types";
import { IBooking } from "@/types/booking";

export const COLUMN_BOOKING: Column<IBooking>[] = [
	{
		key: "title",
		title: "Booking",
		className: "w-[30%] text-start",
	},
	{
		key: "space",
		title: "Room",
		className: "w-[15%] text-center",
	},
	{
		key: "user",
		title: "Booked By",
		className: "w-[15%] text-center",
	},
	{
		key: "status",
		title: "Status",
		className: "w-[10%] text-center",
	},
	{
		key: "startTime",
		title: "Start",
		className: "w-[12%] text-center",
	},
	{
		key: "endTime",
		title: "End",
		className: "w-[12%] text-center",
	},
	{
		key: "actions",
		title: "Actions",
		className: "w-[6%] text-center",
	},
];