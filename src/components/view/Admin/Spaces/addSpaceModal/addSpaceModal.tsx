"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import InputFile from "@/components/ui/InputFIle";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAddSpaceModal from "./useAddSpaceModal";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchSpace: () => void;
}

const AddSpaceModal = ({ open, onOpenChange, refetchSpace }: Props) => {
	const {
		control,
		errors,
		handleSubmit,

		handleAddSpace,

		setValue,
		watch,

		handleUploadFile,
		handleDeleteFile,
		isPendingUploadFile,
		isPendingDeleteFile,

		isPendingSpace,
		isSuccessSpace,

		dataBuilding,
		isLoadingBuilding,
	} = useAddSpaceModal();

	useEffect(() => {
		if (isSuccessSpace) {
			refetchSpace();
			onOpenChange(false);
		}
	}, [isSuccessSpace]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-xl">
				<form onSubmit={handleSubmit(handleAddSpace)}>
					<DialogHeader>
						<DialogTitle>Create Space</DialogTitle>

						<DialogDescription>
							Add a new space into FlexSpace.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-6 py-4">
						{/* Information */}
						<div className="space-y-4">
							<h3 className="font-semibold">Information</h3>

							<div className="space-y-2">
								<Label>Building</Label>

								<Controller
									name="buildingId"
									control={control}
									render={({ field }) => {
										const selectedBuilding =
											dataBuilding.find(
												(building) =>
													building.id ===
														field.value &&
													building.isPublished,
											);

										return (
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select Building">
														{selectedBuilding?.name}
													</SelectValue>
												</SelectTrigger>

												<SelectContent>
													{dataBuilding
														.filter(
															(building) =>
																building.isPublished,
														)
														.map((building) => (
															<SelectItem
																key={
																	building.id
																}
																value={
																	building.id
																}
															>
																{building.name}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										);
									}}
								/>

								{errors.buildingId && (
									<p className="text-sm text-destructive">
										{errors.buildingId.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>Name</Label>

								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Meeting Room A"
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
								<Label>Description</Label>

								<Controller
									name="description"
									control={control}
									render={({ field }) => (
										<Textarea
											{...field}
											rows={3}
											placeholder="Describe this space..."
										/>
									)}
								/>

								{errors.description && (
									<p className="text-sm text-destructive">
										{errors.description.message}
									</p>
								)}
							</div>
						</div>

						{/* Configuration */}
						<div className="space-y-4">
							<div>
								<h3 className="text-base font-semibold">
									Configuration
								</h3>
								<p className="text-sm text-muted-foreground">
									Set the operational configuration of this
									space.
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								{/* Floor */}
								<div className="space-y-2">
									<Label>Floor</Label>

									<Controller
										name="floor"
										control={control}
										render={({ field }) => (
											<Input
												type="number"
												value={field.value ?? ""}
												onChange={(e) =>
													field.onChange(
														e.target.value === ""
															? undefined
															: Number(
																	e.target
																		.value,
																),
													)
												}
											/>
										)}
									/>

									{errors.floor && (
										<p className="text-sm text-destructive">
											{errors.floor.message}
										</p>
									)}
								</div>

								{/* Capacity */}
								<div className="space-y-2">
									<Label>Capacity</Label>

									<Controller
										name="capacity"
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

									{errors.capacity && (
										<p className="text-sm text-destructive">
											{errors.capacity.message}
										</p>
									)}
								</div>

								{/* Status */}
								<div className="space-y-2">
									<Label>Status</Label>

									<Controller
										name="status"
										control={control}
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select status" />
												</SelectTrigger>

												<SelectContent>
													<SelectItem value="ACTIVE">
														Active
													</SelectItem>

													<SelectItem value="MAINTENANCE">
														Maintenance
													</SelectItem>

													<SelectItem value="INACTIVE">
														Inactive
													</SelectItem>
												</SelectContent>
											</Select>
										)}
									/>

									{errors.status && (
										<p className="text-sm text-destructive">
											{errors.status.message}
										</p>
									)}
								</div>

								{/* Publish */}
								<div className="space-y-2">
									<Label>Published</Label>

									<Controller
										name="isPublished"
										control={control}
										render={({ field }) => (
											<div className="flex h-10 items-center justify-between rounded-md border px-3">
												<span className="text-sm text-muted-foreground">
													Visible
												</span>

												<Switch
													checked={
														field.value ?? false
													}
													onCheckedChange={
														field.onChange
													}
												/>
											</div>
										)}
									/>

									{errors.isPublished && (
										<p className="text-sm text-destructive">
											{errors.isPublished.message}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Picture */}
						<div className="space-y-4">
							<InputFile
								name="picture"
								label={<Label>Picture</Label>}
								preview={watch("picture")}
								onUpload={async (files) => {
									const result =
										await handleUploadFile(files);

									if (!result) return;

									setValue("picture", result.secure_url);
									setValue("pictureId", result.public_id);
								}}
								onDelete={async () => {
									if (!watch("pictureId")) return;

									await handleDeleteFile(watch("pictureId"));

									setValue("picture", "");
									setValue("pictureId", "");
								}}
								isUploading={isPendingUploadFile}
								isDeleting={isPendingDeleteFile}
								isInvalid={!!errors.picture}
								errorMessage={errors.picture?.message}
							/>
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

						<Button type="submit" disabled={isPendingSpace}>
							{isPendingSpace ? (
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

export default AddSpaceModal;
