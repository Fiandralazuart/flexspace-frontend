"use client";

import { socket } from "@/lib/socket";
import facilityServices from "@/services/facility.service";
import { FacilityType, UpdateFacility } from "@/types/facility";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


export const updateFacilitySchema = z.object({
	name: z.string().trim().min(1, "Facility name is required"),
	type: z.nativeEnum(FacilityType),
	channel: z.number().min(1),
});

export type UpdateFacilityDTO = z.infer<typeof updateFacilitySchema>;

const useDetailFacility = () => {
	const params = useParams();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm<UpdateFacilityDTO>({
		resolver: zodResolver(updateFacilitySchema),
		defaultValues: {
			name: "",
			type: FacilityType.LIGHT,
			channel: 1,
		},
	});

	const findOneFacility = async () => {
		const result = await facilityServices.getOneFacility(
			`${params.facilityId}`,
		);

		return result;
	};

	const {
		data: dataFacility,
		isLoading: isLoadingFacility,
		isRefetching: isRefetchingFacility,
		refetch: refetchFacility,
	} = useQuery({
		queryKey: ["Facility", params.facilityId],
		queryFn: findOneFacility,
		enabled: !!params.facilityId,
	});

	const updateFacility = async (payload: UpdateFacility) => {
		return await facilityServices.updateFacility(
			payload,
			`${params.facilityId}`,
		);
	};

	const {
		mutate: mutateUpdateFacility,
		isPending: isPendingUpdateFacility,
		isSuccess: isSuccessUpdateFacility,
	} = useMutation({
		mutationFn: updateFacility,
		onSuccess: () => {
			toast.success("Facility updated successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleUpdateFacility = (payload: UpdateFacilityDTO) => {
		mutateUpdateFacility(payload);
	};

	useEffect(() => {
		socket.on("facilityUpdated", refetchFacility);
		socket.on("facilityDeleted", refetchFacility);

		return () => {
			socket.off("facilityUpdated", refetchFacility);
			socket.off("facilityDeleted", refetchFacility);
		};
	}, [refetchFacility]);

	const facility = dataFacility?.data?.data;

	useEffect(() => {
		if (!facility) return;

		reset({
			name: facility.name,
			type: facility.type,
			channel: facility.channel,
		});
	}, [facility, reset]);

	return {
		control,
		errors,
		handleSubmit,
		setValue,
		watch,

		dataFacility,
		refetchFacility,
		isLoadingFacility,
		isRefetchingFacility,

		handleUpdateFacility,
		isPendingUpdateFacility,
		isSuccessUpdateFacility,
	};
};

export default useDetailFacility;