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
import useSchedule from "./useSchedules";
import { COLUMN_SCHEDULE } from "./schedule.constant";
import AddScheduleModal from "./AddScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal";

export interface Schedule {
	id: string;
	spaceId: string;
	title: string;
	description?: string;
	startTime: string;
	endTime: string;
	isBookable: boolean;

	space: {
		id: string;
		name: string;
	};

	createdAt: string;
	updatedAt: string;
}

const ScheduleView = () => {
	const { dataSchedule, meta, refetchSchedule, isLoadingGetSchedule } =
		useSchedule();

	const { search, limit, updateQuery } = useQueryParams();

	const debounce = useDebounce();
	const router = useRouter();

	const [openAddSchedule, setOpenAddSchedule] = useState(false);
	const [openDeleteSchedule, setOpenDeleteSchedule] = useState(false);
	const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
		null,
	);

	const renderCell = (
		schedule: Schedule,
		key: keyof Schedule | "actions",
	) => {
		switch (key) {
			case "title":
				return (
					<div>
						<p className="font-medium">{schedule.title}</p>
						<p className="line-clamp-1 text-xs text-muted-foreground">
							{schedule.description || "-"}
						</p>
					</div>
				);

			case "space":
				return <div className="text-center">{schedule.space.name}</div>;

			case "startTime":
				return (
					<div className="text-center">
						{new Date(schedule.startTime).toLocaleString("id-ID", {
							day: "2-digit",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</div>
				);

			case "endTime":
				return (
					<div className="text-center">
						{new Date(schedule.endTime).toLocaleString("id-ID", {
							day: "2-digit",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</div>
				);

			case "isBookable":
				return (
					<div className="text-center">
						<Badge
							variant="outline"
							className={
								schedule.isBookable
									? "border-emerald-200 bg-emerald-50 text-emerald-700"
									: "border-red-200 bg-red-50 text-red-700"
							}
						>
							{schedule.isBookable ? "Bookable" : "Not Bookable"}
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
									onClick={() =>
										router.push(
											`/admin/schedules/${schedule.id}`,
										)
									}
								>
									Edit
								</DropdownMenuItem>

								<DropdownMenuItem
									className="text-red-600"
									onClick={() => {
										setSelectedSchedule(schedule);
										setOpenDeleteSchedule(true);
									}}
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);

			default:
				return String(schedule[key as keyof Schedule] ?? "-");
		}
	};

	return (
		<>
			<DataTable
				title="Schedule List"
				description="Manage schedules for every space."
				data={dataSchedule}
				columns={COLUMN_SCHEDULE}
				renderCell={renderCell}
				loading={isLoadingGetSchedule}
				search={search}
				searchPlaceholder="Search schedule..."
				onSearch={(value) =>
					debounce(() => {
						updateQuery({
							search: value,
							page: 1,
						});
					}, 500)
				}
				addLabel="Add Schedule"
				onAdd={() => setOpenAddSchedule(true)}
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

			<AddScheduleModal
				open={openAddSchedule}
				onOpenChange={setOpenAddSchedule}
				refetchSchedule={refetchSchedule}
			/>

			<DeleteScheduleModal
				open={openDeleteSchedule}
				onOpenChange={setOpenDeleteSchedule}
				refetchSchedule={refetchSchedule}
				id={selectedSchedule?.id ?? ""}
				name={selectedSchedule?.title ?? ""}
			/>
		</>
	);
};

export default ScheduleView;
