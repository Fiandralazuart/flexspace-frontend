import useMediaHandling from "@/components/hooks/useMediaHandling";
import { socket } from "@/lib/socket";
import buildingServices from "@/services/building.service";
import deviceServices from "@/services/device.service";
import RegionServices from "@/services/region.service";
import { CreateDevice } from "@/types/facility";
import { IBuilding } from "@/types/space";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const createDeviceSchema = z.object({
	name: z
		.string()
		.min(1, "Device name is required")
		.max(100, "Device name must be less than 100 characters"),

	serialNumber: z
		.string()
		.min(1, "Serial number is required")
		.max(100, "Serial number must be less than 100 characters"),
});

export type CreateDeviceSchema = z.infer<typeof createDeviceSchema>;

const useAddDeviceModal = () => {
	const params = useParams()
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		resolver: zodResolver(createDeviceSchema),
		defaultValues: {
			name: "",
			serialNumber: "",
		},
	});
	const createDevice = async (payload: CreateDeviceSchema) => {
		const result = await deviceServices.createDevice({
			...payload,
			spaceId: `${params.id}`
		});
		return result;
	};

	const {
		mutate: mutateCreateDevice,
		isPending: isPendingCreateDevice,
		isSuccess: isSuccessCreateDevice,
	} = useMutation({
		mutationFn: createDevice,
		onError: (error) => {
			toast.error("Failed to create device");
		},
		onSuccess: () => {
			toast.success("Success to create device");
		},
	});

	const handleCreateDevice = (payload: CreateDeviceSchema) =>
		mutateCreateDevice(payload);

	return {
		handleCreateDevice,
		isPendingCreateDevice,
		isSuccessCreateDevice,

		control,
		errors,
		handleSubmit,
		reset,
	};
};

export default useAddDeviceModal;
