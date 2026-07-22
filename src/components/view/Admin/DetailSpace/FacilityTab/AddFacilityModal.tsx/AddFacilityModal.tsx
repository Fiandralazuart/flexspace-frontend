"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";

import useAddFacilityModal from "./useAddFacilityModal";

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
import { FacilityType } from "@/types/facility";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchFacility: () => void;
	deviceId: string;
	type: FacilityType;
}

const facilityTypeLabel: Record<FacilityType, string> = {
	[FacilityType.LIGHT]: "Light",
	[FacilityType.AIR_CONDITIONER]: "Air Conditioner",
};

const AddFacilityModal = ({
	open,
	onOpenChange,
	refetchFacility,
	deviceId,
	type,
}: Props) => {
	const {
		control,
		errors,
		handleSubmit,

		handleAddFacility,

		isPendingFacility,
		isSuccessFacility,
	} = useAddFacilityModal(deviceId, type);

	useEffect(() => {
		if (isSuccessFacility) {
			refetchFacility();
			onOpenChange(false);
		}
	}, [isSuccessFacility]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<form onSubmit={handleSubmit(handleAddFacility)}>
					<DialogHeader>
						<DialogTitle>Create Facility</DialogTitle>

						<DialogDescription>
							Add a new facility to this device.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-6 py-4">
						<div className="space-y-2">
							<Label>Name</Label>

							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder="Facility name"
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
							<Label>Type</Label>

							<Controller
								name="type"
								control={control}
								render={({ field }) => (
									<Select
										value={field.value}
										onValueChange={(value) =>
											field.onChange(
												value as FacilityType,
											)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select facility type" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem
												value={FacilityType.LIGHT}
											>
												Light
											</SelectItem>

											<SelectItem
												value={
													FacilityType.AIR_CONDITIONER
												}
											>
												Air Conditioner
											</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>

							{errors.type && (
								<p className="text-sm text-destructive">
									{errors.type.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label>Channel</Label>

							<Controller
								name="channel"
								control={control}
								render={({ field }) => (
									<Input
										type="number"
										value={field.value}
										onChange={(e) =>
											field.onChange(
												Number(e.target.value),
											)
										}
									/>
								)}
							/>

							{errors.channel && (
								<p className="text-sm text-destructive">
									{errors.channel.message}
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

						<Button type="submit" disabled={isPendingFacility}>
							{isPendingFacility ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Creating...
								</>
							) : (
								"Create"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddFacilityModal;
