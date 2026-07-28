"use client";

import { socket } from "@/lib/socket";
import scheduleServices from "@/services/schedule.service";
import spaceServices from "@/services/space.service";
import { ScheduleStatus, ScheduleType } from "@/types/schedule";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const updateScheduleSchema = z
	.object({
		spaceId: z.string().min(1, "Space is required"),

		type: z.nativeEnum(ScheduleType),

		status: z.nativeEnum(ScheduleStatus),

		title: z
			.string()
			.trim()
			.min(1, "Title is required")
			.max(100, "Title cannot exceed 100 characters"),

		description: z
			.string()
			.trim()
			.max(500, "Description cannot exceed 500 characters")
			.optional(),

		startTime: z.date(),

		endTime: z.date(),
	})
	.refine((data) => data.endTime > data.startTime, {
		message: "End time must be after start time",
		path: ["endTime"],
	});

export type UpdateScheduleDTO = z.infer<typeof updateScheduleSchema>;

const useDetailSchedule = () => {
	const params = useParams();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<UpdateScheduleDTO>({
		resolver: zodResolver(updateScheduleSchema),
		defaultValues: {
			spaceId: "",
			type: ScheduleType.EVENT,
			status: ScheduleStatus.ACTIVE,
			title: "",
			description: "",
			startTime: new Date(),
			endTime: new Date(),
		},
	});

	const findOneSchedule = async () => {
		return scheduleServices.getOneSchedule(`${params.id}`);
	};

	const {
		data: dataSchedule,
		isLoading: isLoadingSchedule,
		isRefetching: isRefetchingSchedule,
		refetch: refetchSchedule,
	} = useQuery({
		queryKey: ["Schedule", params.id],
		queryFn: findOneSchedule,
	});

	const updateSchedule = async (payload: UpdateScheduleDTO) => {
		return scheduleServices.updateSchedule(payload, `${params.id}`);
	};

	const {
		mutate: mutateUpdateSchedule,
		isPending: isPendingUpdateSchedule,
		isSuccess: isSuccessUpdateSchedule,
	} = useMutation({
		mutationFn: updateSchedule,
		onSuccess: () => {
			toast.success("Success update schedule");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleUpdateSchedule = (payload: UpdateScheduleDTO) => {
		mutateUpdateSchedule(payload);
	};

	const findAllSpace = async () => {
		const result = await spaceServices.getAllSpace({
			page: 1,
			limit: 100,
			search: "",
		});

		return result;
	};
	const { data: dataSpace, isLoading: isLoadingSpace } = useQuery({
		queryKey: ["Spaces"],
		queryFn: findAllSpace,
	});

	useEffect(() => {
		socket.on("scheduleCreated", refetchSchedule);
		socket.on("scheduleUpdated", refetchSchedule);
		socket.on("scheduleDeleted", refetchSchedule);

		return () => {
			socket.off("scheduleCreated", refetchSchedule);
			socket.off("scheduleUpdated", refetchSchedule);
			socket.off("scheduleDeleted", refetchSchedule);
		};
	}, [refetchSchedule]);

	useEffect(() => {
		if (!dataSchedule) return;

		const schedule = dataSchedule.data.data;

		reset({
			spaceId: schedule.spaceId,
			type: schedule.type,
			status: schedule.status,
			title: schedule.title,
			description: schedule.description ?? "",
			startTime: new Date(schedule.startTime),
			endTime: new Date(schedule.endTime),
		});
	}, [dataSchedule, reset]);

	return {
		control,
		errors,
		handleSubmit,

		dataSchedule,
		isLoadingSchedule,
		isRefetchingSchedule,

		dataSpace: dataSpace?.data.data ?? [],
		isLoadingSpace,

		handleUpdateSchedule,
		isPendingUpdateSchedule,
		isSuccessUpdateSchedule,
	};
};

export default useDetailSchedule;
