import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";
import { ISpace } from "@/types/space";
import { Params } from "@/types/booking";
import { UpdateSpaceDTO } from "@/components/view/Admin/DetailSpace/useDetailSpace";
import { CreateSpaceDTO } from "@/components/view/Admin/Spaces/addSpaceModal/useAddSpaceModal";

const spaceServices = {
	getAllSpace: (params: Params) =>
		instance.get(endpoint.SPACE, {
			params,
		}),
	createSpace: (payload: CreateSpaceDTO) =>
		instance.post(`${endpoint.SPACE}`, payload),
	updateSpace: (payload: UpdateSpaceDTO, id: string) =>
		instance.put(`${endpoint.SPACE}/${id}`, payload),
	getOneSpace: (id: string) => instance.get(`${endpoint.SPACE}/${id}`),
	deleteSpace: (id: string) =>
		instance.delete(`${endpoint.SPACE}/${id}`),
};


export default spaceServices