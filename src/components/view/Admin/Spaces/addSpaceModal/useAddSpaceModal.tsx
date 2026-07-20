import useMediaHandling from "@/components/hooks/useMediaHandling";
import buildingServices from "@/services/building.service";
import spaceServices from "@/services/space.service";
import { ISpace } from "@/types/space";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const createSpaceSchema = z.object({
	buildingId: z.string().min(1, "Building is required"),

	name: z
		.string()
		.trim()
		.min(1, "Space name is required")
		.max(100, "Space name must not exceed 100 characters"),

	description: z
		.string()
		.trim()
		.min(1, "Description is required")
		.max(255, "Description must not exceed 255 characters"),

	floor: z.number().int().min(1, "Floor must be at least 1"),

	capacity: z.number().int().min(1, "Capacity must be at least 1"),

	picture: z.string(),

	pictureId: z.string(),

	status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
	isPublished: z.boolean(),
});

export type CreateSpaceDTO = z.infer<typeof createSpaceSchema>;

export interface BuildingOption {
	id: string;
	name: string;
	isPublished: boolean;
}

const useAddSpaceModal = () => {
	const {
		handleUploadFile,
		handleDeleteFile,
		isPendingDeleteFile,
		isPendingUploadFile,
	} = useMediaHandling();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm<CreateSpaceDTO>({
		resolver: zodResolver(createSpaceSchema),
		defaultValues: {
			buildingId: "",
			name: "",
			description: "",
			floor: 1,
			capacity: 1,
			picture: "",
			pictureId: "",
			status: "AVAILABLE",
		},
	});

	const createSpace = async (payload: ISpace) => {
		return await spaceServices.createSpace(payload);
	};

	const {
		mutate: mutateSpace,
		isPending: isPendingSpace,
		isSuccess: isSuccessSpace,
	} = useMutation({
		mutationFn: createSpace,
		onSuccess: () => {
			toast.success("Space created successfully");
			reset();
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleAddSpace = (data: CreateSpaceDTO) => {
		mutateSpace(data);
	};

	const getBuildings = async (): Promise<BuildingOption[]> => {
		const response = await buildingServices.getAllBuilding({
			page: 1,
			limit: 100,
			search: "",
		});

		return response.data.data.data;
	};

	const { data: dataBuilding = [], isLoading: isLoadingBuilding } = useQuery({
		queryKey: ["building-option"],
		queryFn: getBuildings,
	});

	return {
		control,
		errors,
		handleSubmit,

		handleAddSpace,

		setValue,
		watch,

		handleUploadFile,
		handleDeleteFile,
		isPendingUploadFile,
		isPendingDeleteFile,

		isPendingSpace,
		isSuccessSpace,

		dataBuilding,
		isLoadingBuilding,
	};
};

export default useAddSpaceModal;
