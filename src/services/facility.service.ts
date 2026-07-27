import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";
import { FacilityParams, Params } from "@/types/space";
import { CreateFacility, UpdateFacility, UpdateFacilityStatus } from "@/types/facility";

const facilityServices = {
	getAllFacility: (params: FacilityParams) =>
		instance.get(endpoint.FACILITY, {
			params,
		}),
	createFacility: (payload: CreateFacility) =>
		instance.post(`${endpoint.FACILITY}`, payload),
	updateFacility: (payload: UpdateFacility, id: string) =>
		instance.put(`${endpoint.FACILITY}/${id}`, payload),
	getOneFacility: (id: string) => instance.get(`${endpoint.FACILITY}/${id}`),
	deleteFacility: (id: string) =>
		instance.delete(`${endpoint.FACILITY}/${id}`),
	controlFacility: (id: string, payload: UpdateFacilityStatus) => instance.put(`${endpoint.CONTROL}/${id}`, payload),
	getOnlineDevices: () =>
		instance.get(`${endpoint.ONLINE}`),
};


export default facilityServices