export interface IDevice {
	id: string;
	name: string;
	serialNumber: string;
	status: DeviceStatus;
}
export interface CreateDevice {
	name: string;
	serialNumber: string;
	spaceId: string;
}
export interface UpdateDevice {
	name: string;
	serialNumber: string;
}

export enum DeviceStatus {
	ONLINE = "ONLINE",
	OFFLINE = "OFFLINE",
	CONNECTING = "CONNECTING",
}

export interface IFacility {
	id: string;
	name: string;
	type: FacilityType;
	channel: number;
	status: FacilityStatus;
	value?: number | null;

	deviceId: string;

	createdBy: string;
	updatedBy?: string | null;

	createdAt: string;
	updatedAt: string;
}

export interface CreateFacility {
	name: string;
	type: FacilityType;
	channel: number;
	deviceId: string;
}

export interface UpdateFacility {
	name: string;
	type: FacilityType;
	channel: number;
}

export interface UpdateFacilityStatus {
	status: FacilityStatus;
	value?: number | null;
}

export enum FacilityType {
	LIGHT = "LIGHT",
	AIR_CONDITIONER = "AIR_CONDITIONER",
}

export enum FacilityStatus {
	ON = "ON",
	OFF = "OFF",
}
