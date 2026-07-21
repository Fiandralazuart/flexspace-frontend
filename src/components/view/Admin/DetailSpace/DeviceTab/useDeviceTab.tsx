import deviceServices from "@/services/device.service";
import { CreateDevice, IDevice } from "@/types/facility";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateDeviceSchema = z.object({
	name: z.string(),
	serialNumber: z.string(),
	status: z.enum(["ONLINE", "OFFLINE"]),
});

export type UpdateDeviceDTO = z.infer<typeof updateDeviceSchema>;

const useDeviceTab = () => {
	const params = useParams();
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		resolver: zodResolver(updateDeviceSchema),
		defaultValues: {
			name: "",
			serialNumber: ""
		}
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



	

	const updateDevice = async (payload: CreateDevice) => {
		const result = await deviceServices.createDevice(payload);
		return result;
	};

	const {
		mutate: mutateUpdateDevice,
		isPending: isPendingUpdateDevice,
		isSuccess: isSuccessUpdateDevice,
	} = useMutation({
		mutationFn: updateDevice,
		onError: (error) => {
			toast.error("Failed to create device")
		},
		onSuccess: () => {
			toast.success("Success to create device")
		}
	});

	const handleUpdateDevice = (payload: CreateDevice) =>
		mutateUpdateDevice(payload);

	return {
		control,
		errors,
		handleSubmit,
		reset,

		handleUpdateDevice,
		isPendingUpdateDevice,
		isSuccessUpdateDevice,

		dataDevice,
		refetchDevice,
	};
};

export default useDeviceTab;
