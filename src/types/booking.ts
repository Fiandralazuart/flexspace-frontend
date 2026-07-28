export enum BookingStatus {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	RELOCATED = "RELOCATED",
	REJECTED = "REJECTED",
	CANCELLED = "CANCELLED",
	COMPLETED = "COMPLETED",
}

export interface IBooking {
	id: string;

	spaceId: string;
	userId: string;

	title: string;
	description?: string;

	startTime: string;
	endTime: string;

	status: BookingStatus;

	adminNote?: string;

	reviewedAt?: string;
	reviewedById?: string;
	reviewedBy?: {
		id: string;
		name: string;
	};

	space: {
		id: string;
		name: string;
	};

	user: {
		id: string;
		name: string;
		email: string;
	};

	createdAt: string;
	updatedAt: string;
}

export interface IBookingPayload {
	spaceId: string;

	title: string;
	description?: string;

	startTime: string;
	endTime: string;
}

export interface IUpdateBookingPayload {
	spaceId?: string;

	title?: string;
	description?: string;

	startTime?: string;
	endTime?: string;

	status?: BookingStatus;
	adminNote?: string;
}

export interface Params {
	search?: string;
	page?: number;
	limit?: number;
}
