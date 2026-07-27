import { useQuery } from "@tanstack/react-query";
import facilityServices from "@/services/facility.service";

const useOnlineDevices = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["online-devices"],
		queryFn: async () => {
			const response = await facilityServices.getOnlineDevices();

			return response.data.data;
		},
		retry: 1,
		refetchInterval: 5000,
		refetchIntervalInBackground: true,
	});

	return {
		data: data ?? [],
		isLoading,
		isError,
	};
};

export default useOnlineDevices;
