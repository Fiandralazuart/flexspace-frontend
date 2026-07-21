import buildingServices from "@/services/building.service";
import deviceServices from "@/services/device.service";
import { Mutation, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const useDeleteDeviceModal = () => {
	const params = useParams();

	const deleteDevice = async (id: string) => {
		const result = await deviceServices.deleteDevice(id);

		return result;
	};

	const {
		mutate: mutateDeleteDevice,
		isPending: isPendingDeleteDevice,
		isSuccess: isSuccessDeleteDevice,
	} = useMutation({
		mutationFn: deleteDevice,
		onError: (error) => {
			toast.error("Failed delete this device");
		},
		onSuccess: () => {
			toast.success("Success delete device");
			
		},
	});

	const handleDeleteDevice = (id: string) => mutateDeleteDevice(id);

	return {
		handleDeleteDevice,
		isPendingDeleteDevice,
		isSuccessDeleteDevice,
	};
};

export default useDeleteDeviceModal;
