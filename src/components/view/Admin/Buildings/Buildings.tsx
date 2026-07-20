"use client";

import { Key, ReactNode, useCallback, useState } from "react";

import useBuilding from "./useBuilding";
import { COLUMN_BUILDING } from "./building.constant";

import DataTable from "@/components/common/DataTable";

import useDebounce from "@/components/hooks/useDebounce";
import useQueryParams from "@/components/hooks/useQueryParams";

import { Building2, MoreHorizontal } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddBuildingModal from "./addBuildingModal";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import DeleteBuildingModal from "./deleteBuildingModal";

export interface Building {
	id: string;
	name: string;
	isPublished: boolean;
	location: {
		address: string;
		link: string;
		region: number;
	};
	createdAt: string;
}

const Building = () => {
	const router = useRouter();
	const { dataBuilding, meta, refetchBuilding, isLoadingGetBuilding } =
		useBuilding();

	const { search, limit, updateQuery } = useQueryParams();

	const debounce = useDebounce();
	const renderCell = useCallback(
		(
			building: Building,
			columnKey: keyof Building | "actions",
		): ReactNode => {
			switch (columnKey) {
				case "name":
					return (
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Building2 className="h-4 w-4 text-primary" />
							</div>

							<div>
								<p className="font-medium">{building.name}</p>

								<p className="text-xs text-muted-foreground">
									{building.location.address}
								</p>
							</div>
						</div>
					);

				case "isPublished":
					return (
						<Badge
							variant={
								building.isPublished ? "default" : "secondary"
							}
							className={
								building.isPublished
									? "bg-emerald-500 hover:bg-emerald-600"
									: "bg-red-200 text-red-600 hover:bg-red-300"
							}
						>
							{building.isPublished ? "Published" : "Draft"}
						</Badge>
					);

				case "createdAt":
					return new Date(building.createdAt).toLocaleDateString(
						"id-ID",
					);

				case "actions":
					return (
						<DropdownMenu>
							<DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent">
								<MoreHorizontal className="h-4 w-4" />
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() =>
										router.push(
											`/admin/buildings/${building.id}`,
										)
									}
								>
									Edit
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={() => {
										setOpenDeleteBuilding(true);
										setSelectedBuilding(building);
									}}
									className="text-red-500"
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);

				default:
					return null;
			}
		},
		[],
	);

	const [openAddBuilding, setOpenAddBuilding] = useState(false);
	const [openDeleteBuilding, setOpenDeleteBuilding] = useState(false);
	const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
		null,
	);

	return (
		<>
			<DataTable<Building>
				title="Building List"
				description="Manage all buildings across your organization."
				data={dataBuilding}
				columns={COLUMN_BUILDING}
				renderCell={renderCell}
				loading={isLoadingGetBuilding}
				search={search}
				searchPlaceholder="Search building..."
				onSearch={(value) =>
					debounce(() => {
						updateQuery({
							search: value,
							page: 1,
						});
					}, 500)
				}
				addLabel="Add Building"
				onAdd={() => setOpenAddBuilding(true)}
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
			<AddBuildingModal
				open={openAddBuilding}
				onOpenChange={setOpenAddBuilding}
				refetchBuilding={refetchBuilding}
			/>
			<DeleteBuildingModal
				open={openDeleteBuilding}
				onOpenChange={setOpenDeleteBuilding}
				refetchBuilding={refetchBuilding}
				name={selectedBuilding?.name || ""}
				id={selectedBuilding?.id || ""}
			/>
		</>
	);
};

export default Building;
