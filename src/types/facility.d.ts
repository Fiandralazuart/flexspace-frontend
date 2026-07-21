

export interface IDevice {
	id: string;
	name: string;
	serialNumber: string,
	status: DeviceStatus
}
export interface CreateDevice {
	name: string;
	serialNumber: string,
	spaceId: string;
}

export enum DeviceStatus {
	ONLINE = "ONLINE",
	OFFLINE = "OFFLINE",
	CONNECTING = "CONNECTING",
}