"use client";

import { useEffect } from "react";
import {
	Control,
	Controller,
	FieldErrors,
	UseFormHandleSubmit,
} from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import DateTimePicker from "@/components/common/DateTimePicker";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ISchedule } from "@/types/schedule";
import { ISpace } from "@/types/space";
import { UpdateScheduleDTO } from "../useDetailSchedule";

interface Props {
	dataSchedule: ISchedule;
	dataSpace: ISpace[];

	control: Control<UpdateScheduleDTO>;
	errors: FieldErrors<UpdateScheduleDTO>;

	handleSubmit: UseFormHandleSubmit<UpdateScheduleDTO>;
	handleUpdateSchedule: (data: UpdateScheduleDTO) => void;

	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const DetailsTab = ({
	dataSpace,
	control,
	errors,
	handleSubmit,
	handleUpdateSchedule,
	isPendingUpdate,
	isSuccessUpdate,
}: Props) => {
	const router = useRouter();

	useEffect(() => {
		if (isSuccessUpdate) {
			// optional
		}
	}, [isSuccessUpdate]);

	return (
		<form onSubmit={handleSubmit(handleUpdateSchedule)}>
			<div className="max-w-2xl py-10">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">
							Schedule Information
						</CardTitle>

						<CardDescription className="text-base">
							Manage detail information about this schedule.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-8">
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">
								Information
							</h3>

							<div className="space-y-2">
								<Label>Space</Label>

								<Controller
									control={control}
									name="spaceId"
									render={({ field }) => {
										const selectedSpace = dataSpace.find(
											(space) => space.id === field.value,
										);

										return (
											<Select
												value={field.value ?? ""}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="w-full">
													<SelectValue>
														{selectedSpace?.name ??
															"Select Space"}
													</SelectValue>
												</SelectTrigger>

												<SelectContent>
													{dataSpace.map((space) => (
														<SelectItem
															key={space.id}
															value={space.id}
														>
															{space.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										);
									}}
								/>

								{errors.spaceId && (
									<p className="text-sm text-destructive">
										{errors.spaceId.message}
									</p>
								)}
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label>Type</Label>

									<Controller
										control={control}
										name="type"
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>

												<SelectContent>
													<SelectItem value="EVENT">
														Event
													</SelectItem>
													<SelectItem value="MAINTENANCE">
														Maintenance
													</SelectItem>
													<SelectItem value="HOLIDAY">
														Holiday
													</SelectItem>
													<SelectItem value="BLOCKED">
														Blocked
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
									<Label>Status</Label>

									<Controller
										control={control}
										name="status"
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="w-full">
													<SelectValue />
												</SelectTrigger>

												<SelectContent>
													<SelectItem value="ACTIVE">
														Active
													</SelectItem>
													<SelectItem value="CANCELLED">
														Cancelled
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
							</div>

							<div className="space-y-2">
								<Label>Title</Label>

								<Controller
									control={control}
									name="title"
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Schedule title"
										/>
									)}
								/>

								{errors.title && (
									<p className="text-sm text-destructive">
										{errors.title.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>Description</Label>

								<Controller
									control={control}
									name="description"
									render={({ field }) => (
										<Textarea
											{...field}
											rows={2}
											value={field.value ?? ""}
											placeholder="Schedule description"
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
							<h3 className="text-lg font-semibold">
								Schedule Time
							</h3>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label>Start Time</Label>

									<Controller
										control={control}
										name="startTime"
										render={({ field }) => (
											<DateTimePicker
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>

									{errors.startTime && (
										<p className="text-sm text-destructive">
											{errors.startTime.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label>End Time</Label>

									<Controller
										control={control}
										name="endTime"
										render={({ field }) => (
											<DateTimePicker
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>

									{errors.endTime && (
										<p className="text-sm text-destructive">
											{errors.endTime.message}
										</p>
									)}
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.push("/admin/schedules")}
						>
							Back
						</Button>

						<Button type="submit" disabled={isPendingUpdate}>
							{isPendingUpdate ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : (
								"Save Changes"
							)}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</form>
	);
};

export default DetailsTab;
