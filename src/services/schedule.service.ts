import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";
import { Params } from "@/types/space";
import { CreateSchedulePayload, UpdateSchedulePayload } from "@/types/schedule";

const scheduleServices = {
	getAllSchedule: (params: Params) =>
		instance.get(endpoint.SCHEDULE, {
			params,
		}),

	createSchedule: (payload: CreateSchedulePayload) =>
		instance.post(endpoint.SCHEDULE, payload),

	updateSchedule: (payload: UpdateSchedulePayload, id: string) =>
		instance.put(`${endpoint.SCHEDULE}/${id}`, payload),

	getOneSchedule: (id: string) => instance.get(`${endpoint.SCHEDULE}/${id}`),

	deleteSchedule: (id: string) =>
		instance.delete(`${endpoint.SCHEDULE}/${id}`),
};

export default scheduleServices;
