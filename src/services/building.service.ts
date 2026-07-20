import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";
import { IBuilding, IBuildingPayload, Params } from "@/types/space";

const buildingServices = {
	getAllBuilding: (params: Params) =>
		instance.get(endpoint.BUILDING, {
			params,
		}),
	createBuilding: (payload: IBuildingPayload) =>
		instance.post(endpoint.BUILDING, payload),

	updateBuilding: (payload: IBuildingPayload, id: string) =>
		instance.put(`${endpoint.BUILDING}/${id}`, payload),

	getOneBuilding: (id: string) => instance.get(`${endpoint.BUILDING}/${id}`),
	deleteBuilding: (id: string) =>
		instance.delete(`${endpoint.BUILDING}/${id}`),
};

export default buildingServices;
