import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import scheduleServices from "@/services/schedule.service";

const useDeleteScheduleModal = () => {
	const deleteSchedule = async (id: string) => {
		const result = await scheduleServices.deleteSchedule(id);

		return result;
	};

	const {
		mutate: mutateDeleteSchedule,
		isPending: isPendingDeleteSchedule,
		isSuccess: isSuccessDeleteSchedule,
	} = useMutation({
		mutationFn: deleteSchedule,
		onSuccess: () => {
			toast.success("Success delete schedule");
		},
		onError: () => {
			toast.error("Failed delete this schedule");
		},
	});

	const handleDeleteSchedule = (id: string) => {
		mutateDeleteSchedule(id);
	};

	return {
		handleDeleteSchedule,
		isPendingDeleteSchedule,
		isSuccessDeleteSchedule,
	};
};

export default useDeleteScheduleModal;