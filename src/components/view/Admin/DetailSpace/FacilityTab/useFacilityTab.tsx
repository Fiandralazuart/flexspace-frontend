import facilityServices from "@/services/facility.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

interface Props {
	deviceId?: string;
}

const useFacilityTab = ({ deviceId }: Props) => {
	const getFacility = async () => {
		const result = await facilityServices.getAllFacility({
			deviceId,
		});

		return result.data.data;
	};

	const {
		data: dataFacility,
		isLoading: isLoadingFacility,
		isRefetching: isRefetchingFacility,
		refetch: refetchFacility,
	} = useQuery({
		queryKey: ["Facility", deviceId],
		queryFn: getFacility,
		enabled: !!deviceId,
	});

	useEffect(() => {
		if (!deviceId) return;

		const handleRefetch = () => refetchFacility();

		socket.on("facilityCreated", handleRefetch);
		socket.on("facilityUpdated", handleRefetch);
		socket.on("facilityDeleted", handleRefetch);

		return () => {
			socket.off("facilityCreated", handleRefetch);
			socket.off("facilityUpdated", handleRefetch);
			socket.off("facilityDeleted", handleRefetch);
		};
	}, [deviceId, refetchFacility]);

	return {
		dataFacility: dataFacility?.data ?? [],
		meta: dataFacility?.meta,

		isLoadingFacility,
		isRefetchingFacility,
		refetchFacility,
	};
};

export default useFacilityTab;