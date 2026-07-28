"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
	currentStep: number;
}

const steps = [
	{
		id: 1,
		title: "Date & Time",
	},
	{
		id: 2,
		title: "Details",
	},
	{
		id: 3,
		title: "Review",
	},
];

const Stepper = ({ currentStep }: StepperProps) => {
	return (
		<div className="mx-auto flex w-full max-w-3xl items-start justify-between">
			{steps.map((step, index) => {
				const completed = currentStep > step.id;
				const active = currentStep === step.id;

				return (
					<div
						key={step.id}
						className="relative flex flex-1 flex-col items-center"
					>
						<div className="flex flex-col items-center">
							<div
								className={cn(
									"flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
									completed &&
										"border-emerald-600 bg-emerald-600 text-white",
									active &&
										"border-emerald-600 bg-white text-emerald-600",
									!completed &&
										!active &&
										"border-gray-300 bg-white text-gray-400",
								)}
							>
								{completed ? (
									<Check className="h-5 w-5" />
								) : (
									step.id
								)}
							</div>

							<p
								className={cn(
									"mt-3 text-sm font-medium whitespace-nowrap",
									active
										? "text-emerald-600"
										: completed
											? "text-black"
											: "text-muted-foreground",
								)}
							>
								{step.title}
							</p>
						</div>

						{index < steps.length - 1 && (
							<div
								className={cn(
									"absolute top-5 left-1/2 ml-8 h-0.5 w-[calc(100%-4rem)] transition-all",
									currentStep > step.id
										? "bg-emerald-600"
										: "bg-gray-200",
								)}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Stepper;
