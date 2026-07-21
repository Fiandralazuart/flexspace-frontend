import { IDevice } from "./facility";

export interface Province {
	id: string;
	name: string;
}

export interface City {
	id: string;
	name: string;
	provinceId: string;
	province: Province;
}

export interface Location {
	link: string;
	address: string;
	region: City;
}

export interface IBuilding {
	id: string;
	name: string;
	location: Location;
	isPublished?: boolean;
}

interface ISpace {
	buildingId: string;
	name: string;
	description: string;
	floor: number;
	capacity: number;
	picture: string;
	pictureId: string;
	status: string;
	devices?: IDevice | null;
}

interface Params {
	page: number;
	limit: number;
	search: string;
}

export interface FacilityParams {
	page?: number;
	limit?: number;
	search?: string;
	deviceId?: string;
}

export interface IBuildingPayload {
	name: string;
	location: {
		link: string;
		address: string;
		region: number;
	};
	isPublished: boolean;
}

export {
	IBuilding,
	ISpace,
	Params
}
