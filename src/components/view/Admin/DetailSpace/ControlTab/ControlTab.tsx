import { Skeleton } from "@/components/ui/skeleton";
import { useFacility } from "../FacilityTab/useFacilityTab";
import ControlCard from "./ContolCard";
import {
	Activity,
	AirVent,
	Building2,
	Camera,
	Cpu,
	Hash,
	Lightbulb,
	LightbulbOff,
	Users,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	DeviceStatus,
	FacilityType,
	IDevice,
	IFacility,
} from "@/types/facility";

import { ISpace } from "@/types/space";
import { Badge } from "@/components/ui/badge";
import { CameraStatus } from "../FacilityTab/useFacilityTab";
import useOnlineDevices from "@/components/hooks/useOnlineDevices";

interface PropTypes {
	deviceId: string;
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

const ControlTab = ({ deviceId, device, space, cameraStatus }: PropTypes) => {
	const { data, isLoading } = useFacility(deviceId, "");
	const { data: onlineDevices, isError } = useOnlineDevices();

	const onlineDevice = onlineDevices.find(
		(item: { id: number; online: boolean }) =>
			String(item.id) === device?.serialNumber,
	);

	const currentDeviceStatus = isError
		? DeviceStatus.OFFLINE
		: onlineDevice?.online
			? DeviceStatus.ONLINE
			: DeviceStatus.OFFLINE;

	console.log("onlineDevices", onlineDevices);
	console.log("device", device);

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

	if (isLoading) {
		return (
			<div className="grid gap-6 lg:grid-cols-2">
				{Array.from({ length: 2 }).map((_, index) => (
					<div key={index} className="space-y-4">
						<Skeleton className="h-8 w-48" />

						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<Skeleton className="h-64 rounded-2xl" />
							<Skeleton className="h-64 rounded-2xl" />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (!data?.data?.length) {
		return (
			<Card className="border-dashed">
				<CardContent className="flex h-72 flex-col items-center justify-center gap-4">
					<div className="rounded-full bg-muted p-5">
						<LightbulbOff className="h-10 w-10 text-muted-foreground" />
					</div>

					<div className="space-y-1 text-center">
						<h3 className="text-lg font-semibold">
							No Facility Found
						</h3>

						<p className="text-sm text-muted-foreground">
							This device doesn't have any facilities yet.
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	const lights = data.data.filter(
		(facility: IFacility) => facility.type === FacilityType.LIGHT,
	);

	const airConditioners = data.data.filter(
		(facility: IFacility) => facility.type === FacilityType.AIR_CONDITIONER,
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
									className={
										deviceStatusStyle[currentDeviceStatus]
									}
								>
									{currentDeviceStatus}
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
			<div className="grid gap-6 lg:grid-cols-2 pt-4">
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Lightbulb className="h-5 w-5 text-amber-500" />

						<h2 className="text-lg font-semibold">Lighting</h2>
					</div>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{lights.map((facility: IFacility) => (
							<ControlCard
								key={facility.id}
								facility={facility}
							/>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<AirVent className="h-5 w-5 text-blue-500" />

						<h2 className="text-lg font-semibold">
							Air Conditioner
						</h2>
					</div>

					<div className="grid grid-cols-1 gap-3  sm:grid-cols-2">
						{airConditioners.map((facility: IFacility) => (
							<ControlCard
								key={facility.id}
								facility={facility}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ControlTab;
