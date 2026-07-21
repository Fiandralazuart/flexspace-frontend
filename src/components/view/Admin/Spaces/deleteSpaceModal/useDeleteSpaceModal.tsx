import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import spaceServices from "@/services/space.service";

const useDeleteSpaceModal = () => {
	const deleteSpace = async (id: string) => {
		const result = await spaceServices.deleteSpace(id);

		return result;
	};

	const {
		mutate: mutateDeleteSpace,
		isPending: isPendingDeleteSpace,
		isSuccess: isSuccessDeleteSpace,
	} = useMutation({
		mutationFn: deleteSpace,
		onSuccess: () => {
			toast.success("Success delete space");
		},
		onError: () => {
			toast.error("Failed delete this space");
		},
	});

	const handleDeleteSpace = (id: string) => {
		mutateDeleteSpace(id);
	};

	return {
		handleDeleteSpace,
		isPendingDeleteSpace,
		isSuccessDeleteSpace,
	};
};

export default useDeleteSpaceModal;