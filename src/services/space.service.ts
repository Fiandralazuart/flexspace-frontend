import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";
import { ISpace } from "@/types/space";

const spaceServices = {
	getAllSpace: () => instance.get(`${endpoint.SPACE}`),
	createSpace: (payload: ISpace) =>
		instance.post(`${endpoint.SPACE}`, payload),
	updateSpace: (payload: ISpace, id: string) =>
		instance.put(`${endpoint.SPACE}/${id}`, payload),
	getOneSpace: (id: string) => instance.get(`${endpoint.SPACE}/${id}`),
	deleteSpace: (id: string) =>
		instance.delete(`${endpoint.SPACE}/${id}`),
};


export default spaceServices