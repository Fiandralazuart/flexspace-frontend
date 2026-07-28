import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

interface DateTimePickerProps {
	value?: Date;
	onChange: (date: Date) => void;
}

const hours = Array.from({ length: 24 }, (_, i) =>
	i.toString().padStart(2, "0"),
);

const minutes = Array.from({ length: 60 }, (_, i) =>
	i.toString().padStart(2, "0"),
);

export default function DateTimePicker({
	value,
	onChange,
}: DateTimePickerProps) {
	const [open, setOpen] = useState(false);

	const date = value ?? new Date();

	const updateDate = (
		newDate: Date,
		hour = date.getHours(),
		minute = date.getMinutes(),
	) => {
		newDate.setHours(hour);
		newDate.setMinutes(minute);
		newDate.setSeconds(0);

		onChange(new Date(newDate));
	};

	return (
		<div className="space-y-2">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger
					render={
						<Button
							type="button"
							variant="outline"
							className="w-full justify-start"
						>
							<CalendarIcon className="mr-2 h-4 w-4" />

							{value
								? format(value, "PPP")
								: "Select date"}
						</Button>
					}
				/>

				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={value}
						onSelect={(selected) => {
							if (!selected) return;

							updateDate(selected);

							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>

			<div className="grid grid-cols-2 gap-2">
				<Select
					value={date.getHours().toString().padStart(2, "0")}
					onValueChange={(hour) => {
						updateDate(
							new Date(date),
							Number(hour),
							date.getMinutes(),
						);
					}}
				>
					<SelectTrigger className="w-full">
						<SelectValue />
					</SelectTrigger>

					<SelectContent>
						{hours.map((hour) => (
							<SelectItem
								key={hour}
								value={hour}
							>
								{hour}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={date
						.getMinutes()
						.toString()
						.padStart(2, "0")}
					onValueChange={(minute) => {
						updateDate(
							new Date(date),
							date.getHours(),
							Number(minute),
						);
					}}
				>
					<SelectTrigger className="w-full">
						<SelectValue />
					</SelectTrigger>

					<SelectContent>
						{minutes.map((minute) => (
							<SelectItem
								key={minute}
								value={minute}
							>
								{minute}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}