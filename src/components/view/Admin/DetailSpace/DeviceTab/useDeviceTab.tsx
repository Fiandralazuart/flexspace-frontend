import deviceServices from "@/services/device.service";
import { CreateDevice, IDevice } from "@/types/facility";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateDeviceSchema = z.object({
	name: z.string().trim().min(1, "Device name is required"),

	serialNumber: z.string().trim().min(1, "Serial number is required"),
});

export type UpdateDeviceDTO = z.infer<typeof updateDeviceSchema>;

type UpdateDevicePayload = {
	id: string;
	data: UpdateDeviceDTO;
};

const useDeviceTab = () => {
	const params = useParams();
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<UpdateDeviceDTO>({
		resolver: zodResolver(updateDeviceSchema),
		defaultValues: {
			name: "",
			serialNumber: "",
		},
	});

	const findOneDevice = async () => {
		const result = await deviceServices.getOneDevice(`${params.id}`);
		return result;
	};

	const { data: dataDevice, refetch: refetchDevice } = useQuery({
		queryKey: ["getDevice"],
		queryFn: findOneDevice,
		enabled: !params.id,
	});

	const updateDevice = async ({ id, data }: UpdateDevicePayload) => {
		return deviceServices.updateDevice(data, id);
	};

	const {
		mutate: mutateUpdateDevice,
		isPending: isPendingUpdateDevice,
		isSuccess: isSuccessUpdateDevice,
	} = useMutation({
		mutationFn: updateDevice,
		onError: (error) => {
			toast.error("Failed to create device");
		},
		onSuccess: () => {
			toast.success("Success to create device");
		},
	});

	const handleUpdateDevice = (id: string, data: UpdateDeviceDTO) => {
		mutateUpdateDevice({
			id,
			data,
		});
	};

	return {
		control,
		errors,
		handleSubmit,
		reset,

		handleUpdateDevice,
		isPendingUpdateDevice,
		isSuccessUpdateDevice,

		refetchDevice,
	};
};

export default useDeviceTab;
