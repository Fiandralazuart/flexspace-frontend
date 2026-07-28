import {
	CalendarCheck2,
	CheckCircle2,
	FileClock,
	XCircle,
	Ban,
	Clock3,
} from "lucide-react";

import { BookingStatus } from "@/types/booking";
import { cn } from "@/lib/utils";

interface Props {
	status: BookingStatus;
}

const getStepColor = (status: BookingStatus) => {
	switch (status) {
		case BookingStatus.PENDING:
			return {
				active: "border-amber-500 bg-amber-500 text-white",
				text: "text-amber-700",
				line: "bg-amber-500",
				card: "border-amber-100",
			};

		case BookingStatus.APPROVED:
		case BookingStatus.RELOCATED:
			return {
				active: "border-emerald-500 bg-emerald-500 text-white",
				text: "text-emerald-700",
				line: "bg-emerald-500",
				card: "border-emerald-100",
			};

		case BookingStatus.COMPLETED:
			return {
				active: "border-blue-500 bg-blue-500 text-white",
				text: "text-blue-700",
				line: "bg-blue-500",
				card: "border-blue-100",
			};

		default:
			return {
				active: "border-slate-500 bg-slate-500 text-white",
				text: "text-slate-700",
				line: "bg-slate-500",
				card: "border-slate-200",
			};
	}
};

const steps = [
	{
		key: "submitted",
		label: "Submitted",
		icon: FileClock,
	},
	{
		key: "review",
		label: "Review",
		icon: Clock3,
	},
	{
		key: "approved",
		label: "Approved",
		icon: CheckCircle2,
	},
	{
		key: "completed",
		label: "Completed",
		icon: CalendarCheck2,
	},
];

const getCurrentStep = (status: BookingStatus) => {
	switch (status) {
		case BookingStatus.PENDING:
			return 1;

		case BookingStatus.APPROVED:
		case BookingStatus.RELOCATED:
			return 2;

		case BookingStatus.COMPLETED:
			return 3;

		default:
			return -1;
	}
};

const ProgressCard = ({ status }: Props) => {
	if (status === BookingStatus.REJECTED) {
		return (
			<div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
				<XCircle className="h-10 w-10 text-red-500" />

				<div>
					<h3 className="font-semibold text-red-700">
						Booking Rejected
					</h3>

					<p className="text-sm text-red-500">
						This booking request was rejected.
					</p>
				</div>
			</div>
		);
	}

	if (status === BookingStatus.CANCELLED) {
		return (
			<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
				<Ban className="h-10 w-10 text-slate-500" />

				<div>
					<h3 className="font-semibold text-slate-700">
						Booking Cancelled
					</h3>

					<p className="text-sm text-slate-500">
						This booking has been cancelled.
					</p>
				</div>
			</div>
		);
	}

	const currentStep = getCurrentStep(status);
	const color = getStepColor(status);

	return (
		<div className={cn("rounded-2xl border bg-white p-6", color.card)}>
			<h3 className="mb-6 text-base font-semibold">Booking Progress</h3>

			<div className="flex items-center">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const active = index <= currentStep;

					return (
						<div
							key={step.key}
							className="flex flex-1 items-center last:flex-none"
						>
							<div className="flex flex-col items-center">
								<div
									className={cn(
										"flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all",
										active
											? color.active
											: "border-slate-200 bg-white text-slate-400",
									)}
								>
									<Icon size={20} />
								</div>

								<p
									className={cn(
										"mt-3 text-sm font-medium",
										active ? color.text : "text-slate-500",
									)}
								>
									{step.label}
								</p>
							</div>

							{index !== steps.length - 1 && (
								<div
									className={cn(
										"mx-4 h-1 flex-1 rounded-full",
										index < currentStep
											? color.line
											: "bg-slate-200",
									)}
								/>
							)}
						</div>
					);
				})}
			</div>

			{status === BookingStatus.RELOCATED && (
				<div className="mt-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700">
					This reservation has been relocated to another space by the
					administrator.
				</div>
			)}
		</div>
	);
};

export default ProgressCard;
