export enum ScheduleType {
	EVENT = "EVENT",
	MAINTENANCE = "MAINTENANCE",
	HOLIDAY = "HOLIDAY",
	BLOCKED = "BLOCKED",
}

export enum ScheduleStatus {
	ACTIVE = "ACTIVE",
	CANCELLED = "CANCELLED",
}

export interface ISchedule {
	id: string;

	spaceId: string;
	space: {
		id: string;
		name: string;
	};

	type: ScheduleType;
	status: ScheduleStatus;

	title: string;
	description?: string;

	startTime: string;
	endTime: string;

	createdAt: string;
	updatedAt: string;
}

export interface CreateSchedulePayload {
	spaceId: string;

	type: ScheduleType;
	status?: ScheduleStatus;

	title: string;
	description?: string;

	startTime: string;
	endTime: string;
}

export interface UpdateSchedulePayload {
	spaceId?: string;

	type?: ScheduleType;
	status?: ScheduleStatus;

	title?: string;
	description?: string;

	startTime?: Date;
	endTime?: Date;
}
