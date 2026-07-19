import { Column } from "@/components/common/DataTable/types";
import { Building } from "./Buildings";

export const COLUMN_BUILDING: Column<Building>[] = [
	{
		key: "name",
		title: "Building",
		className: "w-[50%] text-start",
	},
	{
		key: "isPublished",
		title: "Status",
		className: "w-[15%] text-center",
	},
	{
		key: "createdAt",
		title: "Created At",
		className: "w-[20%] text-center",
	},
	{
		key: "actions",
		title: "Actions",
		className: "w-[15%] text-center",
	},
];
