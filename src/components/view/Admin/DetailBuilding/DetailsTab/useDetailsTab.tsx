import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateBuildingSchema } from "../useDetailBuilding";
import { useQuery } from "@tanstack/react-query";
import buildingServices from "@/services/building.service";
import { useState } from "react";
import RegionServices from "@/services/region.service";
import { City } from "../../Buildings/addBuildingModal/useAddBuildingModal";

const useDetailsTab = () => {
	const findCity = async (name: string): Promise<City[]> => {
		const response = await RegionServices.findCity(name);

		return response.data.data;
	};

	const [searchCity, setSearchCity] = useState("");
	const { data: dataCity = [], isLoading: isLoadingCity } = useQuery({
		queryKey: ["city", searchCity],
		queryFn: () => findCity(searchCity),
		enabled: searchCity.length > 1,
	});

	return {
		dataCity,
		isLoadingCity,
		searchCity,
		setSearchCity,
	};
};

export default useDetailsTab;
