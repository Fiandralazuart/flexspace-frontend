"use client";

import { socket } from "@/lib/socket";
import facilityServices from "@/services/facility.service";
import spaceServices from "@/services/space.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useFacilityTab, { useFacility } from "./FacilityTab/useFacilityTab";

export const updateSpaceSchema = z.object({
	buildingId: z.string().min(1, "Building is required"),

	name: z.string().trim().min(1, "Space name is required").max(100),

	description: z.string().trim(),

	floor: z.number().min(1),

	capacity: z.number().min(1),

	picture: z.string(),

	pictureId: z.string(),
	isPublished: z.boolean(),

	status: z.enum(["ACTIVE", "MAINTENANCE", "INACTIVE"]),
});

export type UpdateSpaceDTO = z.infer<typeof updateSpaceSchema>;

const useDetailSpace = () => {
	const params = useParams();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm<UpdateSpaceDTO>({
		resolver: zodResolver(updateSpaceSchema),
		defaultValues: {
			buildingId: "",
			name: "",
			description: "",
			floor: 1,
			capacity: 1,
			picture: "",
			pictureId: "",
			status: "ACTIVE", // sesuaikan dengan enum kamu
			isPublished: false,
		},
	});

	const findOneSpace = async () => {
		const result = await spaceServices.getOneSpace(`${params.id}`);
		return result;
	};

	const {
		data: dataSpace,
		isLoading: isLoadingSpace,
		isRefetching: isRefetchingSpace,
		refetch: refetchSpace,
	} = useQuery({
		queryKey: ["Space", params.id],
		queryFn: findOneSpace,
	});

	const updateSpace = async (payload: UpdateSpaceDTO) => {
		return await spaceServices.updateSpace(payload, `${params.id}`);
	};

	const {
		mutate: mutateUpdateSpace,
		isPending: isPendingUpdateSpace,
		isSuccess: isSuccessUpdateSpace,
	} = useMutation({
		mutationFn: updateSpace,
		onSuccess: () => {
			toast.success("Space updated successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleUpdateSpace = (payload: UpdateSpaceDTO) => {
		mutateUpdateSpace(payload);
	};

	useEffect(() => {
		socket.on("spaceUpdated", refetchSpace);
		socket.on("spaceDeleted", refetchSpace);

		return () => {
			socket.off("spaceUpdated", refetchSpace);
			socket.off("spaceDeleted", refetchSpace);
		};
	}, [refetchSpace]);

	const space = dataSpace?.data.data;

	useEffect(() => {
		if (!space) return;

		reset({
			buildingId: space.buildingId,
			name: space.name,
			description: space.description,
			floor: space.floor,
			capacity: space.capacity,
			status: space.status,
			picture: space.picture,
			pictureId: space.pictureId,
			isPublished: space.isPublished,
		});
	}, [space, reset]);

	const deviceId = dataSpace?.data?.data?.devices?.id;
	useFacility(deviceId);

	useEffect(() => {
		socket.on("occupancyUpdated", refetchSpace);

		return () => {
			socket.off("occupancyUpdated", refetchSpace);
		};
	}, [refetchSpace]);

	return {
		control,
		errors,
		handleSubmit,
		setValue,
		watch,

		dataSpace,
		refetchSpace,
		isLoadingSpace,
		isRefetchingSpace,

		handleUpdateSpace,
		isPendingUpdateSpace,
		isSuccessUpdateSpace,
	};
};

export default useDetailSpace;
