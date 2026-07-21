"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Control,
	Controller,
	FieldErrors,
	UseFormHandleSubmit,
} from "react-hook-form";
import { useRouter } from "next/navigation";

import { ISpace } from "@/types/space";
import { UpdateSpaceDTO } from "../useDetailSpace";
import useInformationTab from "./useDetailsTab";
import BuildingCombobox from "@/components/common/BuildingComBox";
import { Switch } from "@/components/ui/switch";

type Props = {
	dataSpace: ISpace;

	handleUpdateSpace: (payload: UpdateSpaceDTO) => void;

	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;

	control: Control<UpdateSpaceDTO>;
	errors: FieldErrors<UpdateSpaceDTO>;
	handleSubmit: UseFormHandleSubmit<UpdateSpaceDTO>;
};

const DetailsTab = ({
	dataSpace,
	control,
	errors,
	handleSubmit,
	handleUpdateSpace,
	isPendingUpdate,
}: Props) => {
	const router = useRouter();

	const {
		dataBuilding,
		isLoadingBuilding,
		searchBuilding,
		setSearchBuilding,
	} = useInformationTab();

	return (
		<form onSubmit={handleSubmit(handleUpdateSpace)}>
			<div className="max-w-2xl py-10">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">
							Details Information
						</CardTitle>

						<CardDescription>
							Manage your detail information about this space.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-8">
						<div className="space-y-4">
							<div className="space-y-2">
								<Label>Building</Label>

								<Controller
									name="buildingId"
									control={control}
									render={({ field }) => {
										const selectedBuilding =
											dataBuilding.find(
												(building) =>
													building.id === field.value,
											);

										return (
											<Select
												value={field.value ?? ""}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="w-full">
													<SelectValue
														render={() => (
															<span>
																{selectedBuilding?.name ??
																	"Select Building"}
															</span>
														)}
													/>
												</SelectTrigger>

												<SelectContent>
													{dataBuilding.map(
														(building) => (
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
														),
													)}
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
											placeholder="Space name"
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
											placeholder="Description"
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

						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Floor</Label>

									<Controller
										name="floor"
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
								</div>

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
								</div>
							</div>

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
											<SelectTrigger className="w-full">
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
							<div className="space-y-2">
								<Label>Published</Label>

								<Controller
									name="isPublished"
									control={control}
									render={({ field }) => (
										<div className="flex h-10 items-center justify-between rounded-md border px-3">
											<span className="text-sm text-muted-foreground">
												Visible to users
											</span>

											<Switch
												checked={field.value ?? false}
												onCheckedChange={field.onChange}
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
					</CardContent>

					<CardFooter className="justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.push("/admin/spaces")}
						>
							Back
						</Button>

						<Button type="submit" disabled={isPendingUpdate}>
							Save Changes
						</Button>
					</CardFooter>
				</Card>
			</div>
		</form>
	);
};

export default DetailsTab;
