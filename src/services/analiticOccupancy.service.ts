import instance from "@/lib/axios/instance";


export const getOccupancyTrend = async () => {
	const { data } = await instance.get("/analytics/occupancy/trend");
	return data.data;
};

export const getOccupancySummary = async () => {
	const { data } = await instance.get("/analytics/occupancy/summary");
	return data.data;
};

export const getPeakHour = async () => {
	const { data } = await instance.get("/analytics/occupancy/peak-hour");
	return data.data;
};

export const getOccupancyStatus = async () => {
	const { data } = await instance.get("/analytics/occupancy/status");
	return data.data;
};

export const getUtilization = async () => {
	const { data } = await instance.get("/analytics/occupancy/utilization");
	return data.data;
};

export const getTopSpaces = async () => {
	const { data } = await instance.get("/analytics/occupancy/top-spaces");
	return data.data;
};