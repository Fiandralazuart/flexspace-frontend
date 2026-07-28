"use client";

import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Stepper from "./Stepper";
import DateTimeStep from "./DateTimeStep";

import { ISpace } from "@/types/space";
import useCreateBookingModal from "./useCreateBookingModal";
import DetailsStep from "./DetailsStep";
import ReviewStep from "./ReviewStep";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	space: ISpace;
}

const CreateBookingModal = ({ open, onOpenChange, space }: Props) => {
	const {
		control,
		step,
		nextStep,
		previousStep,
		submit,
		isSubmitting,
		watch,
		setValue,
	} = useCreateBookingModal({
		spaceId: space.id,
		onSuccess: () => onOpenChange(false),
	});

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<DateTimeStep
						control={control}
						watch={watch}
						setValue={setValue}
					/>
				);

			case 2:
				return <DetailsStep control={control} />;

			case 3:
				return (
					<ReviewStep
						space={space}
						title={watch("title")}
						description={watch("description")}
						date={watch("date")}
						startTime={watch("startTime")}
						endTime={watch("endTime")}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[95vw] !max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0">
				<div className="border-b bg-emerald-50/40 px-8 py-6">
					<DialogHeader>
						<DialogTitle className="text-2xl">
							Create Reservation
						</DialogTitle>
					</DialogHeader>

					<div className="mt-4">
						<h2 className="text-lg font-semibold">{space.name}</h2>

						<p className="text-sm text-muted-foreground">
							Floor {space.floor}
						</p>
					</div>

					<div className="mt-8 w-full">
						<Stepper currentStep={step} />
					</div>
				</div>

				<div className="min-h-[500px] px-8 py-8">{renderStep()}</div>

				<div className="flex items-center justify-between border-t bg-muted/30 px-8 py-5">
					<Button
						variant="outline"
						onClick={previousStep}
						disabled={step === 1}
					>
						Back
					</Button>

					{step < 3 ? (
						<Button
							onClick={nextStep}
							className="bg-emerald-600 hover:bg-emerald-700"
						>
							Next
						</Button>
					) : (
						<Button
							onClick={submit}
							disabled={isSubmitting}
							className="bg-emerald-600 hover:bg-emerald-700"
						>
							{isSubmitting ? "Creating..." : "Confirm Booking"}
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateBookingModal;
