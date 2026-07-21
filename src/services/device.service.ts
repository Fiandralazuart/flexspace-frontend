import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";
import { Params } from "@/types/space";
import { CreateDevice, UpdateDevice } from "@/types/facility";

const deviceServices = {
	getAllDevice: (params: Params) =>
		instance.get(endpoint.DEVICE, {
			params,
		}),
	createDevice: (payload: CreateDevice) =>
		instance.post(`${endpoint.DEVICE}`, payload),
	updateDevice: (payload: UpdateDevice, id: string) =>
		instance.put(`${endpoint.DEVICE}/${id}`, payload),
	getOneDevice: (id: string) => instance.get(`${endpoint.DEVICE}/${id}`),
	deleteDevice: (id: string) =>
		instance.delete(`${endpoint.DEVICE}/${id}`),
};


export default deviceServices