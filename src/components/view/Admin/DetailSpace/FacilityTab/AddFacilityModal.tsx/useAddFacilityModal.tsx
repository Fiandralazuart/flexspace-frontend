"use client";

import facilityServices from "@/services/facility.service";
import { CreateFacility, FacilityType } from "@/types/facility";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


export const createFacilitySchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Facility name is required")
		.max(100, "Facility name must not exceed 100 characters"),

	type: z.nativeEnum(FacilityType),

	channel: z.number().min(1, "Channel is required"),
});

export type CreateFacilityDTO = z.infer<typeof createFacilitySchema>;

const useAddFacilityModal = (deviceId: string) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<CreateFacilityDTO>({
		resolver: zodResolver(createFacilitySchema),
		defaultValues: {
			name: "",
			type: FacilityType.LIGHT,
			channel: 1,
		},
	});

	const createFacility = async (payload: CreateFacilityDTO) => {
		return facilityServices.createFacility({
			...payload,
			deviceId,
		});
	};

	const {
		mutate: mutateFacility,
		isPending: isPendingFacility,
		isSuccess: isSuccessFacility,
	} = useMutation({
		mutationFn: createFacility,
		onSuccess: () => {
			toast.success("Facility created successfully");
			reset();
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleAddFacility = (payload: CreateFacilityDTO) => {
		mutateFacility(payload);
	};

	return {
		control,
		errors,
		handleSubmit,

		handleAddFacility,

		isPendingFacility,
		isSuccessFacility,
	};
};

export default useAddFacilityModal;