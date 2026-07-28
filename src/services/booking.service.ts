import instance from "@/lib/axios/instance";
import endpoint from "./endpoint";
import { Params } from "@/types/space";
import { IBookingPayload, IUpdateBookingPayload } from "@/types/booking";

const bookingServices = {
	getAllBooking: (params: Params) =>
		instance.get(endpoint.BOOKING, {
			params,
		}),
	getAllMe: (params: Params) =>
		instance.get(`${endpoint.BOOKING}/me`, {
			params,
		}),

	createBooking: (payload: IBookingPayload) =>
		instance.post(endpoint.BOOKING, payload),

	updateBooking: (payload: IUpdateBookingPayload, id: string) =>
		instance.put(`${endpoint.BOOKING}/${id}`, payload),

	getOneBooking: (id: string) =>
		instance.get(`${endpoint.BOOKING}/${id}`),

	deleteBooking: (id: string) =>
		instance.delete(`${endpoint.BOOKING}/${id}`),
};

export default bookingServices;