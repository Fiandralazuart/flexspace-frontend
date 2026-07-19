import useQueryParams from "@/components/hooks/useQueryParams";
import { socket } from "@/lib/socket";
import buildingServices from "@/services/building.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useBuilding = () => {
	const { page, limit, search } = useQueryParams();
	const getBuilding = async () => {
		const result = await buildingServices.getAllBuilding({
			page,
			limit,
			search,
		});

		return result.data.data;
	};

	

	const {
		data: dataBuilding,
		isLoading: isLoadingGetBuilding,
		isRefetching: isRefetchingBuilding,
		refetch: refetchBuilding,
	} = useQuery({
		queryKey: ["Building", page, limit, search],
		queryFn: () => getBuilding(),
	});

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

	return {
		dataBuilding: dataBuilding?.data ?? [],
		meta: dataBuilding?.meta,

		isLoadingGetBuilding,
		isRefetchingBuilding,
		refetchBuilding,
		page
	};
};

export default useBuilding;
