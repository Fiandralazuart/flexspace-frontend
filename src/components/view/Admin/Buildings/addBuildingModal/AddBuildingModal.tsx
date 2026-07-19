"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";

import useAddBuildingModal from "./useAddBuildingModal";
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

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchBuilding: () => void;
}

const AddBuildingModal = ({ open, onOpenChange, refetchBuilding }: Props) => {
	const {
		control,
		errors,
		handleSubmit,

		handleAddBuilding,

		handleUploadFile,
		handleDeleteFile,
		isPendingUploadFile,
		isPendingDeleteFile,

		isPendingBuilding,
		isSuccessBuilding,
		dataCity,
		searchCity,
		setSearchCity,
	} = useAddBuildingModal();

	useEffect(() => {
		if (isSuccessBuilding) {
			refetchBuilding();
			onOpenChange(false);
		}
	}, [isSuccessBuilding]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-xl">
				<form onSubmit={handleSubmit(handleAddBuilding)}>
					<DialogHeader>
						<DialogTitle>Create Building</DialogTitle>
						<DialogDescription>
							Add a new building into FlexSpace.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-6 py-4">
						<div className="space-y-4">
							<h3 className="font-semibold">Information</h3>

							<div className="space-y-2">
								<Label>Name</Label>

								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Building name"
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

						<div className="space-y-4">
							<h3 className="font-semibold">Location</h3>

							<div className="space-y-2">
								<Label>Address</Label>

								<Controller
									name="location.address"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Building address"
										/>
									)}
								/>

								{errors.location?.address && (
									<p className="text-sm text-destructive">
										{errors.location.address.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>City</Label>

								<Controller
									name="location.region"
									control={control}
									render={({ field }) => (
										<div className="space-y-2">
											<Input
												placeholder="Search city..."
												value={searchCity}
												onChange={(e) =>
													setSearchCity(
														e.target.value,
													)
												}
											/>

											<Select
												value={
													field.value
														? String(field.value)
														: ""
												}
												onValueChange={(value) =>
													field.onChange(
														Number(value),
													)
												}
												disabled={!dataCity.length}
											>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder={
															searchCity.length <
															2
																? "Type city name..."
																: "Select city"
														}
													/>
												</SelectTrigger>

												<SelectContent>
													{dataCity.length === 0 ? (
														<div className="px-3 py-2 text-sm text-muted-foreground">
															No city found
														</div>
													) : (
														dataCity.map((city) => (
															<SelectItem
																key={city.id}
																value={city.id}
															>
																<div className="flex flex-col">
																	<span>
																		{
																			city.name
																		}
																	</span>
																	<span className="text-xs text-muted-foreground">
																		{
																			city
																				.province
																				.name
																		}
																	</span>
																</div>
															</SelectItem>
														))
													)}
												</SelectContent>
											</Select>
										</div>
									)}
								/>

								{errors.location?.region && (
									<p className="text-sm text-destructive">
										{errors.location.region.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>Google Maps Link</Label>

								<Controller
									name="location.link"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="https://maps.google.com/..."
										/>
									)}
								/>

								{errors.location?.link && (
									<p className="text-sm text-destructive">
										{errors.location.link.message}
									</p>
								)}
							</div>
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

						<Button type="submit" disabled={isPendingBuilding}>
							{isPendingBuilding ? (
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

export default AddBuildingModal;
