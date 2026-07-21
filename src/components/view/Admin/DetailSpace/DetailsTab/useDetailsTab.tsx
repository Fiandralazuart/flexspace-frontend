import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import buildingServices from "@/services/building.service";
import { IBuilding } from "@/types/space";

const useInformationTab = () => {
	const findBuilding = async (name: string): Promise<IBuilding[]> => {
		const response = await buildingServices.getAllBuilding({
			page: 1,
			limit: 100,
			search: name,
		});

		return response.data.data.data;
	};

	const [searchBuilding, setSearchBuilding] = useState("");

	const { data: dataBuilding = [], isLoading: isLoadingBuilding } = useQuery({
		queryKey: ["building-select", searchBuilding],
		queryFn: () => findBuilding(searchBuilding),
	});

	return {
		dataBuilding,
		isLoadingBuilding,
		searchBuilding,
		setSearchBuilding,
	};
};

export default useInformationTab;
