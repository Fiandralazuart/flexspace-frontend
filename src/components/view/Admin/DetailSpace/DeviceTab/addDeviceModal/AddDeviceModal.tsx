"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";

import useAddDeviceModal from "./useAddDeviceModal";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchSpace: () => void;
}

const AddDeviceModal = ({
	open,
	onOpenChange,
	refetchSpace,
}: Props) => {
	const {
		handleCreateDevice,
		isPendingCreateDevice,
		isSuccessCreateDevice,

		control,
		errors,
		handleSubmit,
		reset,
	} = useAddDeviceModal();

	useEffect(() => {
		if (isSuccessCreateDevice) {
			refetchSpace();
			reset();
			onOpenChange(false);
		}
	}, [isSuccessCreateDevice]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<form onSubmit={handleSubmit(handleCreateDevice)}>
					<DialogHeader>
						<DialogTitle>Create Device</DialogTitle>

						<DialogDescription>
							Register a new IoT device for this space.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-6 py-4">
						<div className="space-y-2">
							<Label>Device Name</Label>

							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder="ESP32 Meeting Room A"
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
										placeholder="ESP32-001"
									/>
								)}
							/>

							{errors.serialNumber && (
								<p className="text-sm text-destructive">
									{errors.serialNumber.message}
								</p>
							)}
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>

						<Button
							type="submit"
							disabled={isPendingCreateDevice}
						>
							{isPendingCreateDevice ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Creating...
								</>
							) : (
								"Create Device"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddDeviceModal;