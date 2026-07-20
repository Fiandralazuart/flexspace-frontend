import { Column } from "@/components/common/DataTable/types";
import { Space } from "./Spaces";

export const COLUMN_SPACE: Column<Space>[] = [
	{
		key: "name",
		title: "Space",
		className: "w-[30%] text-start",
	},
	{
		key: "building",
		title: "Building",
		className: "text-center",
	},
	{
		key: "floor",
		title: "Floor",
		className: "text-center",
	},
	{
		key: "capacity",
		title: "Capacity",
		className: "text-center",
	},
	{
		key: "occupancy",
		title: "Occupancy",
		className: "w-[240px]",
	},
	{
		key: "status",
		title: "Status",
		className: "text-center",
	},
	{
		key: "actions",
		title: "Actions",
		className: "w-[80px] text-center",
	},
];
