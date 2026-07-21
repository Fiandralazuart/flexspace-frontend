import { Column } from "@/components/common/DataTable/types";
import { IFacility } from "@/types/facility";

export const COLUMN_FACILITY: Column<IFacility>[] = [
	{
		key: "name",
		title: "Facility",
		className: "w-[40%] text-start",
	},
	{
		key: "type",
		title: "Type",
		className: "w-[20%] text-center",
	},
	{
		key: "channel",
		title: "Channel",
		className: "w-[15%] text-center",
	},
	{
		key: "status",
		title: "Status",
		className: "w-[15%] text-center",
	},
	{
		key: "actions",
		title: "Actions",
		className: "w-[10%] text-center",
	},
];