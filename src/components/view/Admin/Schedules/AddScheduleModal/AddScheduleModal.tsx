"use client";

import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import useAddScheduleModal from "./useAddScheduleModal";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScheduleStatus, ScheduleType } from "@/types/schedule";
import { useEffect } from "react";
import DateTimePicker from "@/components/common/DateTimePicker";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchSchedule: () => void;
}

const AddScheduleModal = ({ open, onOpenChange, refetchSchedule }: Props) => {
	const {
		control,
		handleSubmit,
		handleAddSchedule,
		dataSpace,
		isLoadingSpace,
		isPendingSchedule,
		watch,
		isSuccessSchedule,
	} = useAddScheduleModal();

	const selectedSpace = dataSpace.find(
		(space) => space.id === watch("spaceId"),
	);

	useEffect(() => {
		if (isSuccessSchedule) {
			refetchSchedule();
			onOpenChange(false);
		}
	}, [isSuccessSchedule, refetchSchedule, onOpenChange]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add Schedule</DialogTitle>

					<DialogDescription>
						Create a schedule for a space.
					</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(handleAddSchedule)}
					className="space-y-5"
				>
					{/* Space */}

					<div className="space-y-2">
						<label className="text-sm font-medium">Space</label>

						<Controller
							control={control}
							name="spaceId"
							render={({ field, fieldState }) => (
								<>
									<Select
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger>
											<SelectValue>
												{selectedSpace?.name ??
													"Select Space"}
											</SelectValue>
										</SelectTrigger>

										<SelectContent>
											{isLoadingSpace ? (
												<SelectItem
													value="loading"
													disabled
												>
													Loading...
												</SelectItem>
											) : (
												dataSpace.map((space) => (
													<SelectItem
														key={space.id}
														value={space.id}
													>
														{space.name}
													</SelectItem>
												))
											)}
										</SelectContent>
									</Select>

									{fieldState.error && (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									)}
								</>
							)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{/* Type */}

						<div className="space-y-2">
							<label className="text-sm font-medium">Type</label>

							<Controller
								control={control}
								name="type"
								render={({ field, fieldState }) => (
									<>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>

											<SelectContent>
												<SelectItem
													value={ScheduleType.EVENT}
												>
													Event
												</SelectItem>

												<SelectItem
													value={
														ScheduleType.MAINTENANCE
													}
												>
													Maintenance
												</SelectItem>

												<SelectItem
													value={ScheduleType.HOLIDAY}
												>
													Holiday
												</SelectItem>

												<SelectItem
													value={ScheduleType.BLOCKED}
												>
													Blocked
												</SelectItem>
											</SelectContent>
										</Select>

										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</>
								)}
							/>
						</div>

						{/* Status */}

						<div className="space-y-2">
							<label className="text-sm font-medium">
								Status
							</label>

							<Controller
								control={control}
								name="status"
								render={({ field, fieldState }) => (
									<>
										<Select
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>

											<SelectContent>
												<SelectItem
													value={
														ScheduleStatus.ACTIVE
													}
												>
													Active
												</SelectItem>

												<SelectItem
													value={
														ScheduleStatus.CANCELLED
													}
												>
													Cancelled
												</SelectItem>
											</SelectContent>
										</Select>

										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</>
								)}
							/>
						</div>
					</div>

					{/* Title */}

					<div className="space-y-2">
						<label className="text-sm font-medium">Title</label>

						<Controller
							control={control}
							name="title"
							render={({ field, fieldState }) => (
								<>
									<Input
										placeholder="Schedule title"
										{...field}
									/>

									{fieldState.error && (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									)}
								</>
							)}
						/>
					</div>

					{/* Description */}

					<div className="space-y-2">
						<label className="text-sm font-medium">
							Description
						</label>

						<Controller
							control={control}
							name="description"
							render={({ field, fieldState }) => (
								<>
									<Textarea
										rows={4}
										placeholder="Description..."
										{...field}
										value={field.value ?? ""}
									/>

									{fieldState.error && (
										<p className="text-sm text-destructive">
											{fieldState.error.message}
										</p>
									)}
								</>
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						{/* Start Time */}

						<div className="space-y-2">
							<label className="text-sm font-medium">
								Start Time
							</label>

							<Controller
								control={control}
								name="startTime"
								render={({ field, fieldState }) => (
									<>
										<DateTimePicker
											value={field.value}
											onChange={field.onChange}
										/>

										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</>
								)}
							/>
						</div>

						{/* End Time */}

						<div className="space-y-2">
							<label className="text-sm font-medium">
								End Time
							</label>

							<Controller
								control={control}
								name="endTime"
								render={({ field, fieldState }) => (
									<>
										<DateTimePicker
											value={field.value}
											onChange={field.onChange}
										/>

										{fieldState.error && (
											<p className="text-sm text-destructive">
												{fieldState.error.message}
											</p>
										)}
									</>
								)}
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

						<Button type="submit" disabled={isPendingSchedule}>
							{isPendingSchedule
								? "Creating..."
								: "Create Schedule"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddScheduleModal;
