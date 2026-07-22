"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import facilityServices from "@/services/facility.service";

const useDeleteFacilityModal = () => {
	const deleteFacility = async (id: string) => {
		const result = await facilityServices.deleteFacility(id);

		return result;
	};

	const {
		mutate: mutateDeleteFacility,
		isPending: isPendingDeleteFacility,
		isSuccess: isSuccessDeleteFacility,
	} = useMutation({
		mutationFn: deleteFacility,
		onSuccess: () => {
			toast.success("Facility deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete facility");
		},
	});

	const handleDeleteFacility = (id: string) => {
		mutateDeleteFacility(id);
	};

	return {
		handleDeleteFacility,
		isPendingDeleteFacility,
		isSuccessDeleteFacility,
	};
};

export default useDeleteFacilityModal;