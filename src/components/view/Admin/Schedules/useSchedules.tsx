import useQueryParams from "@/components/hooks/useQueryParams";
import { socket } from "@/lib/socket";
import scheduleServices from "@/services/schedule.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useSchedule = () => {
	const { page, limit, search } = useQueryParams();

	const getSchedule = async () => {
		const result = await scheduleServices.getAllSchedule({
			page,
			limit,
			search,
		});

		return result.data.data;
	};

	const {
		data: dataSchedule,
		isLoading: isLoadingGetSchedule,
		isRefetching: isRefetchingSchedule,
		refetch: refetchSchedule,
	} = useQuery({
		queryKey: ["Schedule", page, limit, search],
		queryFn: getSchedule,
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

	return {
		dataSchedule: dataSchedule?.data ?? [],
		meta: dataSchedule?.meta,

		isLoadingGetSchedule,
		isRefetchingSchedule,
		refetchSchedule,

		page,
	};
};

export default useSchedule;