"use client";

import facilityServices from "@/services/facility.service";
import { UpdateFacilityStatus } from "@/types/facility";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useControl = () => {
	const controlFacility = async (
		id: string,
		payload: UpdateFacilityStatus,
	) => {
		return await facilityServices.controlFacility(id, payload);
	};

	const {
		mutate: mutateControlFacility,
		isPending: isPendingControlFacility,
		isSuccess: isSuccessControlFacility,
	} = useMutation({
		mutationFn: async ({
			id,
			payload,
		}: {
			id: string;
			payload: UpdateFacilityStatus;
		}) => {
			const response = await controlFacility(id, payload);

			console.log(response);
			
			return response;
		},
		
		onSuccess: (response) => {
			console.log(response.data);
			toast.success("Facility controlled successfully");
		},

		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleToggle = (id: string, payload: UpdateFacilityStatus) => {
		mutateControlFacility({
			id,
			payload,
		});
	};

	return {
		handleToggle,

		isPendingControlFacility,
		isSuccessControlFacility,
	};
};

export default useControl;
