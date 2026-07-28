import { CalendarCheck2, FileClock, ShieldCheck } from "lucide-react";

import { BookingStatus } from "@/types/booking";

interface Props {
	status: BookingStatus;
}

const Step = ({
	active,
	icon,
	title,
}: {
	active: boolean;
	icon: React.ReactNode;
	title: string;
}) => (
	<div className="flex flex-col items-center gap-3">
		<div
			className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
				active
					? "border-emerald-500 bg-emerald-500 text-white"
					: "border-slate-200 bg-slate-100 text-slate-400"
			}`}
		>
			{icon}
		</div>

		<p className="text-sm font-medium">{title}</p>
	</div>
);

const ProgressStepper = ({ status }: Props) => {
	const approved =
		status === BookingStatus.APPROVED || status === BookingStatus.COMPLETED;

	const completed = status === BookingStatus.COMPLETED;

	return (
		<div className="rounded-xl border border-emerald-100 bg-white p-6">
			<h3 className="mb-6 font-semibold">Approval Progress</h3>

			<div className="flex items-center">
				<Step active icon={<FileClock size={20} />} title="Submitted" />

				<div className="mx-4 h-[3px] flex-1 rounded-full bg-emerald-400" />

				<Step
					active={approved}
					icon={<ShieldCheck size={20} />}
					title="Approved"
				/>

				<div
					className={`mx-4 h-[3px] flex-1 rounded-full ${
						completed ? "bg-emerald-400" : "bg-slate-200"
					}`}
				/>

				<Step
					active={completed}
					icon={<CalendarCheck2 size={20} />}
					title="Completed"
				/>
			</div>
		</div>
	);
};

export default ProgressStepper;
