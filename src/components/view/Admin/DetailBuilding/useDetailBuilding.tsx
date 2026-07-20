"use client";

import { socket } from "@/lib/socket";
import buildingServices from "@/services/building.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z, { boolean } from "zod";

export const updateBuildingSchema = z.object({
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
	isPublished: z.boolean(),
});

export type UpdateBuildingDTO = z.infer<typeof updateBuildingSchema>;

const useDetailBuilding = () => {
	const params = useParams();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm<UpdateBuildingDTO>({
		resolver: zodResolver(updateBuildingSchema),
		// defaultValues: {
		// 	buildingId: "",
		// 	name: "",
		// 	description: "",
		// 	floor: 1,
		// 	capacity: 1,
		// 	picture: "",
		// 	pictureId: "",
		// 	status: "AVAILABLE",
		// },
	});

	const findOneBuilding = async () => {
		const result = await buildingServices.getOneBuilding(`${params.id}`);
		return result;
	};
	const {
		data: dataBuilding,
		isLoading: isLoadingBuilding,
		isRefetching: isRefetchingBuilding,
		refetch: refetchBuilding,
	} = useQuery({
		queryKey: ["Building"],
		queryFn: () => findOneBuilding(),
	});

	const updateBuilding = async (payload: UpdateBuildingDTO) => {
		const result = await buildingServices.updateBuilding(
			payload,
			`${params.id}`,
		);
		return result;
	};

	const {
		mutate: mutateUpdateBuilding,
		isPending: isPendingUpdateBuilding,
		isSuccess: isSuccessUpdateBuilding,
	} = useMutation({
		mutationFn: updateBuilding,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: () => {
			toast.success("Success Update Building");
		},
	});

	const handleUpdateBuilding = (payload: UpdateBuildingDTO) =>
		mutateUpdateBuilding(payload);

	useEffect(() => {
		socket.on("buildingCreated", refetchBuilding);
		socket.on("buildingUpdated", refetchBuilding);
		socket.on("buildingDeleted", refetchBuilding);

		return () => {
			socket.off("buildingCreated", refetchBuilding);
			socket.off("buildingUpdated", refetchBuilding);
			socket.off("buildingDeleted", refetchBuilding);
		};
	}, [refetchBuilding]);

	useEffect(() => {
		if (!dataBuilding) return;

		const building = dataBuilding.data.data;

		reset({
			name: building.name,
			location: {
				region: Number(building.location.region),
				address: building.location.address,
				link: building.location.link,
			},
			isPublished: building.isPublished,
		});
	}, [dataBuilding, reset]);

	return {
		control,
		errors,
		handleSubmit,
		dataBuilding,
		isLoadingBuilding,
		isRefetchingBuilding,
		handleUpdateBuilding,
		isPendingUpdateBuilding,
		isSuccessUpdateBuilding,
	};
};

export default useDetailBuilding;
