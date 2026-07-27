import instance from "@/lib/axios/instance";
import { ILogin, IRegister } from "@/types/auth";
import endpoint from "./endpoint";

const authServices = {
	login: (payload: ILogin) =>
		instance.post(`${endpoint.AUTH}/login`, payload),
	register: (payload: IRegister) =>
		instance.post(`${endpoint.AUTH}/register`, payload),
	getProfileWithToken: (token: string) =>
		instance.get(`${endpoint.AUTH}/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	activation: (token: string) =>
		instance.post(`${endpoint.AUTH}/activation/${token}`),
};

export default authServices;
