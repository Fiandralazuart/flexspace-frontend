import useQueryParams from "@/components/hooks/useQueryParams";
import { socket } from "@/lib/socket";
import spaceServices from "@/services/space.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useSpace = () => {
	const { page, limit, search } = useQueryParams();

	const getSpace = async () => {
		const result = await spaceServices.getAllSpace({
			page,
			limit,
			search,
		});
		return result.data;
	};

	const {
		data: dataSpace,
		isLoading: isLoadingGetSpace,
		isRefetching: isRefetchingSpace,
		refetch: refetchSpace,
	} = useQuery({
		queryKey: ["Space", page, limit, search],
		queryFn: getSpace,
	});

		useEffect(() => {
		socket.on("spaceCreated", refetchSpace);
		socket.on("spaceUpdated", refetchSpace);
		socket.on("spaceDeleted", refetchSpace);
		socket.on("occupancyUpdated", refetchSpace);
		console.count("occupancyUpdated");

		return () => {
			socket.off("spaceCreated", refetchSpace);
			socket.off("spaceUpdated", refetchSpace);
			socket.off("spaceDeleted", refetchSpace);
			socket.off("occupancyUpdated", refetchSpace);
		};
	}, [refetchSpace]);

	return {
		dataSpace: dataSpace?.data ?? [],
		meta: dataSpace?.meta,

		isLoadingGetSpace,
		isRefetchingSpace,
		refetchSpace,

		page,
	};
};

export default useSpace;
