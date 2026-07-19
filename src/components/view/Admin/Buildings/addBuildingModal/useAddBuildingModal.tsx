import useMediaHandling from "@/components/hooks/useMediaHandling";
import buildingServices from "@/services/building.service";
import RegionServices from "@/services/region.service";
import { IBuilding } from "@/types/space";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const createBuildingSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Building name is required")
		.max(100, "Building name must not exceed 100 characters"),

	location: z.object({
		link: z.string().trim().url("Invalid Google Maps link"),

		region: z.number({
			error: "Region is required",
		}),

		address: z
			.string()
			.trim()
			.min(1, "Address is required")
			.max(255, "Address must not exceed 255 characters"),
	}),
});

export type CreateBuildingDTO = z.infer<typeof createBuildingSchema>;

export interface City {
	id: string;
	provinceId: string;
	name: string;
	province: {
		id: string;
		name: string;
	};
}

const useAddBuildingModal = () => {
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
	} = useForm<CreateBuildingDTO>({
		resolver: zodResolver(createBuildingSchema),
		defaultValues: {
			name: "",
			location: {
				link: "",
				region: undefined,
				address: "",
			},
		},
	});

	const createBuilding = async (payload: IBuilding) => {
		return await buildingServices.createBuilding(payload);
	};

	const {
		mutate: mutateBuilding,
		isPending: isPendingBuilding,
		isSuccess: isSuccessBuilding,
	} = useMutation({
		mutationFn: createBuilding,
		onSuccess: () => {
			toast.success("Building created successfully");
			reset();
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleAddBuilding = (data: CreateBuildingDTO) => {
		mutateBuilding(data);
	};

	// sementara hardcode agar query langsung jalan
	const findCity = async (name: string): Promise<City[]> => {
		const response = await RegionServices.findCity(name);

		return response.data.data;
	};

	const [searchCity, setSearchCity] = useState("");
	const { data: dataCity = [], isLoading: isLoadingCity } = useQuery({
		queryKey: ["city", searchCity],
		queryFn: () => findCity(searchCity),
		enabled: searchCity.length > 1,
	});

	return {
		control,
		errors,
		handleSubmit,

		handleAddBuilding,

		handleUploadFile,
		handleDeleteFile,
		isPendingUploadFile,
		isPendingDeleteFile,

		isPendingBuilding,
		isSuccessBuilding,

		dataCity,
		isLoadingCity,
		searchCity, 
		setSearchCity
	};
};

export default useAddBuildingModal;
