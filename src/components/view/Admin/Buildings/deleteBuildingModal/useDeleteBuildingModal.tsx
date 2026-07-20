import buildingServices from "@/services/building.service";
import { Mutation, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const useDeleteBuildingModal = () => {
	const params = useParams();

	const deleteBuilding = async (id: string) => {
		const result = await buildingServices.deleteBuilding(id);

		return result;
	};

	const {
		mutate: mutateDeleteBuilding,
		isPending: isPendingDeleteBuilding,
		isSuccess: isSuccessDeleteBuilding,
	} = useMutation({
		mutationFn: deleteBuilding,
		onError: (error) => {
			toast.error("Failed delete this building");
		},
		onSuccess: () => {
			toast.success("Success delete building");
			
		},
	});

	const handleDeleteBuilding = (id: string) => mutateDeleteBuilding(id);

	return {
		handleDeleteBuilding,
		isPendingDeleteBuilding,
		isSuccessDeleteBuilding,
	};
};

export default useDeleteBuildingModal;
