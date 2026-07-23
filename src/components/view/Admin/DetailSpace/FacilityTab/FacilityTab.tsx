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

const deviceStatusStyle: Record<DeviceStatus, string> = {
	[DeviceStatus.ONLINE]: "bg-emerald-500 text-white hover:bg-emerald-600",

	[DeviceStatus.OFFLINE]: "bg-red-500 text-white hover:bg-red-600",

	[DeviceStatus.CONNECTING]: "bg-amber-500 text-white hover:bg-amber-600",
};

const cameraStatusStyle: Record<CameraStatus, string> = {
	[CameraStatus.ONLINE]: "bg-emerald-500 text-white hover:bg-emerald-600",

	[CameraStatus.DELAYED]: "bg-amber-500 text-white hover:bg-amber-600",

	[CameraStatus.OFFLINE]: "bg-red-500 text-white hover:bg-red-600",
};

const FacilityTab = (props: PropsTypes) => {
	const { deviceId, type, device, cameraStatus, space } = props;
	const { dataFacility, isLoadingFacility, refetchFacility } = useFacilityTab(
		{ deviceId },
	);

	const { search, updateQuery } = useQueryParams();
	const debounce = useDebounce();
	const router = useRouter();
	const pathname = usePathname();
	const personCount = space.personCount ?? 0;
	const capacity = space.capacity;

	const percentage =
		capacity > 0 ? Math.round((personCount / capacity) * 100) : 0;

	const progressWidth = Math.min(percentage, 100);

	const occupancyBadge =
		personCount > capacity
			? {
					label: "OVER CAPACITY",
					className: "border-red-200 bg-red-50 text-red-700",
				}
			: personCount === 0
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
			<div className="grid gap-4 mb-6 mt-3 md:grid-cols-2">
				{/* Device Information */}
				{device ? (
					<Card>
						<CardHeader className="pb-4">
							<CardTitle className="text-lg">
								Device Information
							</CardTitle>
						</CardHeader>

						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Cpu className="h-4 w-4" />
									<span>Device</span>
								</div>

								<p className="font-medium">{device.name}</p>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Hash className="h-4 w-4" />
									<span>Serial</span>
								</div>

								<p className="font-medium">
									{device.serialNumber}
								</p>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Cpu className="h-4 w-4" />
									<span>Status</span>
								</div>

								<Badge
									className={deviceStatusStyle[device.status]}
								>
									{device.status}
								</Badge>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Camera className="h-4 w-4" />
									<span>Camera</span>
								</div>

								<Badge
									className={cameraStatusStyle[cameraStatus]}
								>
									{cameraStatus}
								</Badge>
							</div>
						</CardContent>
					</Card>
				) : (
					<Card className="h-fit border-dashed">
						<CardHeader>
							<CardTitle>No Device Connected</CardTitle>

							<CardDescription>
								This space doesn't have a connected IoT device
								yet.
							</CardDescription>
						</CardHeader>
					</Card>
				)}

				{/* Occupancy Information */}
				<Card className="h-fit">
					<CardHeader className="pb-4">
						<CardTitle className="text-lg">
							Occupancy Information
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Users className="h-4 w-4" />
								<span>People Count</span>
							</div>

							<p className="font-medium">{personCount}</p>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Building2 className="h-4 w-4" />
								<span>Capacity</span>
							</div>

							<p className="font-medium">{capacity}</p>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Activity className="h-4 w-4" />
									<span>Occupancy</span>
								</div>

								<p
									className={`font-medium ${
										percentage > 100 ? "text-red-600" : ""
									}`}
								>
									{percentage}%
								</p>
							</div>

							<div className="h-2.5 overflow-hidden rounded-full bg-muted">
								<div
									className={`h-full rounded-full transition-all duration-300 ${
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
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Activity className="h-4 w-4" />
								<span>Status</span>
							</div>

							<Badge
								variant="outline"
								className={occupancyBadge.className}
							>
								{occupancyBadge.label}
							</Badge>
						</div>
					</CardContent>
				</Card>
			</div>
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
