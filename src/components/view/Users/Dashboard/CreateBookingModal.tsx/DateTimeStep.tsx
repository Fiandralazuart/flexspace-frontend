"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
	Control,
	Controller,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";

import { CalendarDays, Clock3 } from "lucide-react";

import { CreateBookingForm } from "./useCreateBookingModal";

interface Props {
	control: Control<CreateBookingForm>;
	watch: UseFormWatch<CreateBookingForm>;
	setValue: UseFormSetValue<CreateBookingForm>;
}

const timeSlots = [
	"08:00",
	"08:30",
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
	"16:00",
];

const bookedSlots = ["09:30", "13:30"];

const DateTimeStep = ({ control, watch, setValue }: Props) => {
	const selectedDate = watch("date");
	const startTime = watch("startTime");
	const endTime = watch("endTime");

	const renderTimeButton = (
		slot: string,
		selected: string | undefined,
		field: "startTime" | "endTime",
	) => {
		const disabled = bookedSlots.includes(slot);

		return (
			<button
				key={slot}
				type="button"
				disabled={disabled}
				onClick={() => setValue(field, slot)}
				className={cn(
					"h-8 rounded-md border px-2 text-xs font-medium transition-all",

					selected === slot &&
						"border-emerald-600 bg-emerald-600 text-white",

					!disabled &&
						selected !== slot &&
						"hover:border-emerald-500 hover:bg-emerald-50",

					disabled &&
						"cursor-not-allowed border-red-200 bg-red-50 text-red-400 line-through",
				)}
			>
				{slot}
			</button>
		);
	};

	return (
		<div className="grid gap-8 lg:grid-cols-2">
			{/* Calendar */}
			<div>
				<h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
					<CalendarDays className="h-5 w-5 text-emerald-600" />
					Select Date
				</h3>

				<div className="rounded-xl border p-3">
					<Controller
						name="date"
						control={control}
						render={() => (
							<Calendar
								mode="single"
								selected={selectedDate}
								onSelect={(date) => {
									if (date) {
										setValue("date", date);
									}
								}}
								disabled={(date) => date < new Date()}
								className="rounded-md"
							/>
						)}
					/>
				</div>
			</div>

			{/* Right */}
			<div className="space-y-6">
				<div>
					<h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
						<Clock3 className="h-5 w-5 text-emerald-600" />
						Start Time
					</h3>

					<div className="grid grid-cols-4 gap-2">
						{timeSlots.map((slot) =>
							renderTimeButton(slot, startTime, "startTime"),
						)}
					</div>
				</div>

				<div>
					<h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
						<Clock3 className="h-5 w-5 text-emerald-600" />
						End Time
					</h3>

					<div className="grid grid-cols-4 gap-2">
						{timeSlots.map((slot) =>
							renderTimeButton(slot, endTime, "endTime"),
						)}
					</div>
				</div>

				<div className="rounded-xl border bg-slate-50 p-4">
					<h4 className="mb-4 font-semibold">Reservation Summary</h4>

					<div className="space-y-3 text-sm">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Date</span>

							<span className="font-medium">
								{selectedDate
									? selectedDate.toLocaleDateString("id-ID")
									: "-"}
							</span>
						</div>

						<div className="flex justify-between">
							<span className="text-muted-foreground">
								Start Time
							</span>

							<span className="font-medium">
								{startTime ?? "-"}
							</span>
						</div>

						<div className="flex justify-between">
							<span className="text-muted-foreground">
								End Time
							</span>

							<span className="font-medium">
								{endTime ?? "-"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DateTimeStep;
