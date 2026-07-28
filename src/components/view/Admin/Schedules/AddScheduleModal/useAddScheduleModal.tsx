import scheduleServices from "@/services/schedule.service";
import spaceServices from "@/services/space.service";
import {
	CreateSchedulePayload,
	ScheduleStatus,
	ScheduleType,
} from "@/types/schedule";
import { ISpace } from "@/types/space";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const createScheduleSchema = z
	.object({
		spaceId: z.string().min(1, "Space is required"),

		type: z.nativeEnum(ScheduleType),

		status: z.nativeEnum(ScheduleStatus),

		title: z
			.string()
			.trim()
			.min(1, "Title is required")
			.max(100, "Title must not exceed 100 characters"),

		description: z
			.string()
			.trim()
			.max(255, "Description must not exceed 255 characters")
			.optional(),

		startTime: z.date(),

		endTime: z.date(),
	})
	.refine((data) => data.endTime > data.startTime, {
		message: "End time must be after start time",
		path: ["endTime"],
	});

export type CreateScheduleDTO = z.infer<typeof createScheduleSchema>;

const useAddScheduleModal = () => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm<CreateScheduleDTO>({
		resolver: zodResolver(createScheduleSchema),
		defaultValues: {
			spaceId: "",
			type: ScheduleType.EVENT,
			status: ScheduleStatus.ACTIVE,
			title: "",
			description: "",
		},
	});

	const createSchedule = async (payload: CreateSchedulePayload) => {
		return await scheduleServices.createSchedule(payload);
	};

	const {
		mutate: mutateSchedule,
		isPending: isPendingSchedule,
		isSuccess: isSuccessSchedule,
	} = useMutation({
		mutationFn: createSchedule,
		onSuccess: () => {
			toast.success("Schedule created successfully");
			reset();
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleAddSchedule = (data: CreateScheduleDTO) => {
		mutateSchedule({
			...data,
			startTime: data.startTime.toISOString(),
			endTime: data.endTime.toISOString(),
		});
	};

	const getSpaces = async (): Promise<ISpace[]> => {
		const response = await spaceServices.getAllSpace({
			page: 1,
			limit: 100,
			search: "",
		});

		return response.data.data.data;
	};

	const {
		data: dataSpace = [],
		isLoading: isLoadingSpace,
	} = useQuery({
		queryKey: ["space-option"],
		queryFn: getSpaces,
	});

	return {
		control,
		errors,
		handleSubmit,

		handleAddSchedule,

		setValue,
		watch,

		isPendingSchedule,
		isSuccessSchedule,

		dataSpace,
		isLoadingSpace,
	};
};

export default useAddScheduleModal;