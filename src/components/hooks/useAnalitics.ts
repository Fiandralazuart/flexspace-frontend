import { useQuery } from "@tanstack/react-query";

import {
	getOccupancyStatus,
	getOccupancySummary,
	getOccupancyTrend,
	getPeakHour,
	getTopSpaces,
	getUtilization,
} from "@/services/analiticOccupancy.service";

export const useOccupancySummary = () =>
	useQuery({
		queryKey: ["occupancy-summary"],
		queryFn: getOccupancySummary,
	});

export const useOccupancyTrend = () =>
	useQuery({
		queryKey: ["occupancy-trend"],
		queryFn: getOccupancyTrend,
	});

export const usePeakHour = () =>
	useQuery({
		queryKey: ["peak-hour"],
		queryFn: getPeakHour,
	});

export const useOccupancyStatus = () =>
	useQuery({
		queryKey: ["occupancy-status"],
		queryFn: getOccupancyStatus,
	});

export const useUtilization = () =>
	useQuery({
		queryKey: ["utilization"],
		queryFn: getUtilization,
	});

export const useTopSpaces = () =>
	useQuery({
		queryKey: ["top-spaces"],
		queryFn: getTopSpaces,
	});
