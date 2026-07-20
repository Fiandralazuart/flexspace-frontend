"use client";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useDebounce from "@/components/hooks/useDebounce";
import useQueryParams from "@/components/hooks/useQueryParams";

import useSpace from "./useSpaces";
import DataTable from "@/components/common/DataTable";
import { COLUMN_SPACE } from "./space.constant";
import AddSpaceModal from "./addSpaceModal";
import { useState } from "react";

export interface Space {
	id: string;
	name: string;
	description: string;
	floor: number;
	capacity: number;
	personCount: number;
	occupancy: "EMPTY" | "OCCUPIED";
	status: "AVAILABLE" | "UNAVAILABLE";

	building: {
		id: string;
		name: string;
	};
}

const SpacesView = () => {
	const { dataSpace, meta, refetchSpace, isLoadingGetSpace } = useSpace();
	const { search, limit, updateQuery } = useQueryParams();

	const debounce = useDebounce();

	interface Props {
		onEdit?: (space: Space) => void;
		onDelete?: (space: Space) => void;
	}

	const renderCell = (space: Space, key: keyof Space | "actions") => {
		switch (key) {
			case "name":
				return (
					<div>
						<p className="font-medium">{space.name}</p>

						<p className="line-clamp-1 text-xs text-muted-foreground">
							{space.description}
						</p>
					</div>
				);

			case "building":
				return <div className="text-center">{space.building.name}</div>;

			case "floor":
				return <div className="text-center">{space.floor}</div>;

			case "capacity":
				return <div className="text-center">{space.capacity}</div>;

			case "occupancy": {
				const percentage =
					space.capacity > 0
						? Math.round((space.personCount / space.capacity) * 100)
						: 0;

				const progressWidth = Math.min(percentage, 100);

				const occupancyBadge =
					space.personCount > space.capacity
						? {
								label: "OVER CAPACITY",
								className:
									"border-red-200 bg-red-50 text-red-700",
							}
						: space.occupancy === "EMPTY"
							? {
									label: "EMPTY",
									className:
										"border-slate-200 bg-slate-50 text-slate-700",
								}
							: {
									label: "OCCUPIED",
									className:
										"border-amber-200 bg-amber-50 text-amber-700",
								};

				return (
					<div className="space-y-2">
						<div className="flex items-center justify-between text-xs">
							<span className="font-medium">
								{space.personCount} / {space.capacity} people
							</span>

							<span
								className={`font-semibold ${
									percentage > 100 ? "text-red-600" : ""
								}`}
							>
								{percentage}%
							</span>
						</div>

						<div className="h-2 overflow-hidden rounded-full bg-muted">
							<div
								className={`h-full rounded-full transition-all ${
									percentage > 100
										? "bg-red-500"
										: percentage > 80
											? "bg-amber-500"
											: "bg-emerald-500"
								}`}
								style={{
									width: `${progressWidth}%`,
								}}
							/>
						</div>

						<Badge
							variant="outline"
							className={occupancyBadge.className}
						>
							{occupancyBadge.label}
						</Badge>
					</div>
				);
			}

			case "status":
				return (
					<div className="text-center">
						<Badge
							className={
								space.status === "AVAILABLE"
									? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
									: "bg-orange-100 text-orange-700 hover:bg-orange-100"
							}
						>
							{space.status}
						</Badge>
					</div>
				);

			case "actions":
				return (
					<div className="flex justify-center">
						<DropdownMenu>
							<DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
								<MoreHorizontal className="h-4 w-4" />
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end">
								<DropdownMenuItem>Edit</DropdownMenuItem>

								<DropdownMenuItem className="text-red-600">
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			default:
				return String(space[key as keyof Space] ?? "-");
		}
	};

	const [openAddSpace, setOpenAddSpace] = useState(false);

	return (
		<>
			<DataTable
				title="Space List"
				description="Manage all spaces across your organization."
				data={dataSpace}
				columns={COLUMN_SPACE}
				renderCell={renderCell}
				loading={isLoadingGetSpace}
				search={search}
				searchPlaceholder="Search space..."
				onSearch={(value) =>
					debounce(() => {
						updateQuery({
							search: value,
							page: 1,
						});
					}, 500)
				}
				addLabel="Add Space"
				onAdd={() => setOpenAddSpace(true)}
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

			<AddSpaceModal
				open={openAddSpace}
				onOpenChange={setOpenAddSpace}
				refetchSpace={refetchSpace}
			/>
		</>
	);
};

export default SpacesView;
