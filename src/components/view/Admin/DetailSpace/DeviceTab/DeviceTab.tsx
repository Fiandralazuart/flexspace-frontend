import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ISpace } from "@/types/space";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import useDeviceTab from "./useDeviceTab";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AddDeviceModal from "./addDeviceModal";
import { Trash2 } from "lucide-react";
import DeleteDeviceModal from "./deleteDeviceModal";

const statusConfig = {
	ONLINE: {
		label: "Online",
		className:
			"rounded-full border-green-200 bg-green-50 px-3 py-3 text-sm font-semibold text-green-700",
	},
	OFFLINE: {
		label: "Offline",
		className:
			"rounded-full border-red-200 bg-red-50 px-3 py-3 text-sm font-semibold text-red-700",
	},
	CONNECTING: {
		label: "Connecting",
		className:
			"rounded-full border-yellow-200 bg-yellow-50 px-3 py-3 text-sm font-semibold text-yellow-700",
	},
};

type PropsTypes = {
	dataSpace: ISpace;
	refetchSpace: () => void;
};

const DeviceTab = (props: PropsTypes) => {
	const router = useRouter();
	const { dataSpace, refetchSpace } = props;

	const {
		control,
		errors,
		handleSubmit,
		reset,

		handleUpdateDevice,
		isPendingUpdateDevice,
		isSuccessUpdateDevice,

		refetchDevice,
	} = useDeviceTab();

	const currentStatus =
		statusConfig[dataSpace.devices?.status as keyof typeof statusConfig] ??
		statusConfig.OFFLINE;

	console.log(dataSpace.devices?.id);
	useEffect(() => {
		if (dataSpace.devices) {
			reset({
				name: dataSpace.devices.name,
				serialNumber: dataSpace.devices.serialNumber,
			});
		}
	}, [dataSpace.devices, reset]);

	const [openAddDeviceModal, setAddDeviceModal] = useState(false);
	const [openDeleteDeviceModal, setDeleteDeviceModal] = useState(false);
	return (
		<div className="max-w-2xl py-10">
			{!dataSpace.devices ? (
				<>
					<Card>
						<CardHeader>
							<CardTitle>No Device Connected</CardTitle>

							<CardDescription>
								This space doesn't have a registered device yet.
							</CardDescription>
						</CardHeader>

						<CardContent>
							<div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
								<h3 className="text-lg font-semibold">
									No device available
								</h3>

								<p className="mt-2 text-sm text-muted-foreground">
									Register a device to start monitoring this
									space.
								</p>
							</div>
						</CardContent>

						<CardFooter className="justify-end">
							<Button onClick={() => setAddDeviceModal(true)}>
								Register Device
							</Button>
						</CardFooter>
					</Card>
					<AddDeviceModal
						onOpenChange={setAddDeviceModal}
						open={openAddDeviceModal}
						refetchSpace={refetchSpace}
					/>
				</>
			) : (
				<>
					<form
						onSubmit={handleSubmit((data) => {
							if (!dataSpace.devices) return;
							handleUpdateDevice(dataSpace.devices.id, data);
						})}
					>
						<Card>
							<CardHeader className="flex flex-row items-start justify-between">
								<div>
									<CardTitle className="text-2xl">
										Device Configuration
									</CardTitle>

									<CardDescription>
										Manage your device configuration about
										this space.
									</CardDescription>
								</div>

								<div className="flex items-center gap-2">
									<Badge
										variant="outline"
										className={currentStatus.className}
									>
										{currentStatus.label}
									</Badge>

									<Button
										onClick={() =>
											setDeleteDeviceModal(true)
										}
										variant="destructive"
										size="icon"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardHeader>

							<CardContent className="space-y-8">
								<div className="space-y-4">
									<div className="space-y-2">
										<Label>Name</Label>

										<Controller
											name="name"
											control={control}
											render={({ field }) => (
												<Input
													{...field}
													placeholder="Device name"
												/>
											)}
										/>

										{errors.name && (
											<p className="text-sm text-destructive">
												{errors.name.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label>Serial Number</Label>

										<Controller
											name="serialNumber"
											control={control}
											render={({ field }) => (
												<Input
													{...field}
													placeholder="Serial number"
												/>
											)}
										/>

										{errors.name && (
											<p className="text-sm text-destructive">
												{errors.name.message}
											</p>
										)}
									</div>
								</div>
							</CardContent>

							<CardFooter className="justify-end gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => router.push("/admin/spaces")}
								>
									Back
								</Button>

								<Button type="submit">Save Changes</Button>
							</CardFooter>
						</Card>
					</form>
					<DeleteDeviceModal
						open={openDeleteDeviceModal}
						onOpenChange={setDeleteDeviceModal}
						refetchSpace={refetchSpace}
						name={dataSpace.devices?.name || ""}
						id={dataSpace.devices?.id || ""}
					/>
				</>
			)}
		</div>
	);
};

export default DeviceTab;
