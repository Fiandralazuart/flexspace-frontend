import facilityServices from "@/services/facility.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { Search } from "lucide-react";
import useQueryParams from "@/components/hooks/useQueryParams";

interface Props {
	deviceId?: string;
}

const useFacilityTab = ({ deviceId }: Props) => {
	const { search } = useQueryParams();
	const { data, isLoading, isRefetching, refetch } = useFacility(
		deviceId,
		search,
	);

	useEffect(() => {
		if (!deviceId) return;

		const handleRefetch = () => refetch();

		socket.on("facilityCreated", handleRefetch);
		socket.on("facilityUpdated", handleRefetch);
		socket.on("facilityDeleted", handleRefetch);
		socket.on("occupancyUpdated", handleRefetch);

		return () => {
			socket.off("facilityCreated", handleRefetch);
			socket.off("facilityUpdated", handleRefetch);
			socket.off("facilityDeleted", handleRefetch);
			socket.off("occupancyUpdated", handleRefetch);
		};
	}, [deviceId, refetch]);

	return {
		dataFacility: data?.data ?? [],
		meta: data?.meta,
		isLoadingFacility: isLoading,
		isRefetchingFacility: isRefetching,
		refetchFacility: refetch,
	};
};

export const useFacility = (deviceId?: string, search?: string) => {
	return useQuery({
		queryKey: ["Facility", deviceId, search],
		queryFn: async () => {
			const result = await facilityServices.getAllFacility({
				deviceId,
				search,
			});
			return result.data.data;
		},
		enabled: !!deviceId,
	});
};

export enum CameraStatus {
	ONLINE = "ONLINE",
	DELAYED = "DELAYED",
	OFFLINE = "OFFLINE",
}

export const getCameraStatus = (
	lastDetectedAt: string | null | undefined,
): CameraStatus => {
	if (!lastDetectedAt) return CameraStatus.OFFLINE;

	const diff = Date.now() - new Date(lastDetectedAt).getTime();

	if (diff <= 30 * 1000) {
		return CameraStatus.ONLINE;
	}

	if (diff <= 2 * 60 * 1000) {
		return CameraStatus.DELAYED;
	}

	return CameraStatus.OFFLINE;
};

export default useFacilityTab;
