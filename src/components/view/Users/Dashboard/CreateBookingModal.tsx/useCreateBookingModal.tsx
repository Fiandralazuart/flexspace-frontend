"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import bookingServices from "@/services/booking.service";

export interface CreateBookingForm {
	title: string;
	description: string;

	date?: Date;

	startTime?: string;
	endTime?: string;
}

interface Props {
	spaceId: string;
	onSuccess?: () => void;
}

const useCreateBookingModal = ({ spaceId, onSuccess }: Props) => {
	const [step, setStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { control, handleSubmit, watch, setValue, reset, trigger } =
		useForm<CreateBookingForm>({
			defaultValues: {
				title: "",
				description: "",
			},
		});

	const nextStep = async () => {
		let valid = true;

		if (step === 1) {
			const date = watch("date");
			const startTime = watch("startTime");
			const endTime = watch("endTime");

			valid = !!date && !!startTime && !!endTime;
		}

		if (step === 2) {
			valid = await trigger(["title", "description"]);
		}

		if (!valid) {
			toast.error("Please complete this step.");
			return;
		}

		setStep((prev) => Math.min(prev + 1, 3));
	};

	const previousStep = () => {
		setStep((prev) => Math.max(prev - 1, 1));
	};

	const submit = handleSubmit(async (values) => {
		try {
			setIsSubmitting(true);

			if (!values.date || !values.startTime || !values.endTime) {
				toast.error("Invalid booking.");
				return;
			}

			const yyyy = values.date.getFullYear();
			const mm = String(values.date.getMonth() + 1).padStart(2, "0");
			const dd = String(values.date.getDate()).padStart(2, "0");

			const date = `${yyyy}-${mm}-${dd}`;

			await bookingServices.createBooking({
				spaceId,

				title: values.title,

				description: values.description,

				startTime: `${date}T${values.startTime}:00`,

				endTime: `${date}T${values.endTime}:00`,
			});

			toast.success("Booking submitted successfully.");

			reset();

			setStep(1);

			onSuccess?.();
		} catch (error) {
			console.error(error);

			toast.error("Failed to create booking.");
		} finally {
			setIsSubmitting(false);
		}
	});

	return {
		control,
		watch,
		setValue,
		step,
		setStep,
		nextStep,
		previousStep,
		submit,
		isSubmitting,
	};
};

export default useCreateBookingModal;
