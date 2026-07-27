"use client";

import { ReactNode, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Lightbulb,
	Snowflake,
	MoreHorizontal,
	Hash,
	Cpu,
	Camera,
	Building2,
	Users,
	Activity,
} from "lucide-react";

import { COLUMN_FACILITY } from "./facility.constant";
import useFacilityTab, { CameraStatus } from "./useFacilityTab";
import {
	DeviceStatus,
	FacilityStatus,
	FacilityType,
	IDevice,
	IFacility,
} from "@/types/facility";
import useQueryParams from "@/components/hooks/useQueryParams";
import useDebounce from "@/components/hooks/useDebounce";
import AddFacilityModal from "./AddFacilityModal.tsx";
import DeleteFacilityModal from "./DeleteFacilityModal.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ISpace } from "@/types/space";
import { Progress } from "@/components/ui/progress";

interface PropsTypes {
	deviceId: string;
	type?: FacilityType;
	device?: IDevice | null;
	space: ISpace;
	cameraStatus: CameraStatus;
}


const FacilityTab = (props: PropsTypes) => {
	const { deviceId, type, device, cameraStatus, space } = props;
	const { dataFacility, isLoadingFacility, refetchFacility } = useFacilityTab(
		{ deviceId },
	);

	const { search, updateQuery } = useQueryParams();
	const debounce = useDebounce();
	const router = useRouter();
	const pathname = usePathname();
	
	const renderCell = useCallback(
		(
			facility: IFacility,
			columnKey: keyof IFacility | "actions",
		): ReactNode => {
			switch (columnKey) {
				case "name":
					return (
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								{facility.type === FacilityType.LIGHT ? (
									<Lightbulb className="h-4 w-4 " />
								) : (
									<Snowflake className="h-4 w-4 " />
								)}
							</div>

							<p className="font-medium">{facility.name}</p>
						</div>
					);

				case "type":
					return facility.type === FacilityType.LIGHT
						? "Light"
						: "Air Conditioner";

				case "channel":
					return facility.channel;

				case "status":
					return (
						<Badge
							variant={
								facility.status === FacilityStatus.ON
									? "default"
									: "secondary"
							}
							className={
								facility.status === FacilityStatus.ON
									? "bg-emerald-500 hover:bg-emerald-600"
									: "bg-red-200 text-red-700 hover:bg-red-300"
							}
						>
							{facility.status}
						</Badge>
					);

				case "actions":
					return (
						<DropdownMenu>
							<DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent">
								<MoreHorizontal className="h-4 w-4" />
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() => {
										router.push(
											`${pathname}/${facility.id}`,
										);
									}}
								>
									Edit
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={() => {
										setSelectedFacility(facility);
										setOpenDeleteFacility(true);
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

	const [openAddFacilityModal, setAddFacilityModal] = useState(false);
	const [openDeleteFacility, setOpenDeleteFacility] = useState(false);
	const [selectedFacility, setSelectedFacility] = useState<IFacility | null>(
		null,
	);

	return (
		<>
			<DataTable<IFacility>
				title="Facility List"
				description="Manage smart facilities connected to this device."
				data={dataFacility}
				columns={COLUMN_FACILITY}
				renderCell={renderCell}
				loading={isLoadingFacility}
				search={search}
				searchPlaceholder="Search facility..."
				onSearch={(value) =>
					debounce(() => {
						updateQuery({
							search: value,
							page: 1,
						});
					}, 500)
				}
				addLabel={device ? "Add Facility" : undefined}
				onAdd={device ? () => setAddFacilityModal(true) : undefined}
			/>
			{device && (
				<AddFacilityModal
					open={openAddFacilityModal}
					onOpenChange={setAddFacilityModal}
					refetchFacility={refetchFacility}
					deviceId={device.id}
				/>
			)}
			<DeleteFacilityModal
				open={openDeleteFacility}
				onOpenChange={setOpenDeleteFacility}
				refetchFacility={refetchFacility}
				name={selectedFacility?.name ?? ""}
				id={selectedFacility?.id ?? ""}
			/>
		</>
	);
};

export default FacilityTab;
