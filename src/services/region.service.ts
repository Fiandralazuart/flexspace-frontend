import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";

const RegionServices = {
	findCity: (name: string) =>
		instance.get(`${endpoint.REGION}/city`, {
			params: {
				name,
			},
		}),
};

export default RegionServices;