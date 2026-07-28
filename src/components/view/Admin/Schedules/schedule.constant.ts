import { Column } from "@/components/common/DataTable/types";
import { Schedule } from "./Schedules";

export const COLUMN_SCHEDULE: Column<Schedule>[] = [
	{
		key: "title",
		title: "Title",
		className: "w-[25%] text-start",
	},
	{
		key: "space",
		title: "Space",
		className: "text-center",
	},
	{
		key: "startTime",
		title: "Start Time",
		className: "text-center",
	},
	{
		key: "endTime",
		title: "End Time",
		className: "text-center",
	},
	{
		key: "isBookable",
		title: "Bookable",
		className: "text-center",
	},
	{
		key: "actions",
		title: "Actions",
		className: "w-[80px] text-center",
	},
];