"use client";

import useQueryParams from "@/components/hooks/useQueryParams";
import { socket } from "@/lib/socket";
import bookingServices from "@/services/booking.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useBooking = () => {
	const { page, limit, search } = useQueryParams();

	const getBooking = async () => {
		const result = await bookingServices.getAllBooking({
			page,
			limit,
			search,
		});

		return result.data.data;
	};

	const {
		data: dataBooking,
		isLoading: isLoadingGetBooking,
		isRefetching: isRefetchingBooking,
		refetch: refetchBooking,
	} = useQuery({
		queryKey: ["Booking", page, limit, search],
		queryFn: () => getBooking(),
	});

	useEffect(() => {
		socket.on("bookingCreated", refetchBooking);
		socket.on("bookingUpdated", refetchBooking);
		socket.on("bookingDeleted", refetchBooking);

		return () => {
			socket.off("bookingCreated", refetchBooking);
			socket.off("bookingUpdated", refetchBooking);
			socket.off("bookingDeleted", refetchBooking);
		};
	}, [refetchBooking]);

	return {
		dataBooking: dataBooking?.data ?? [],
		meta: dataBooking?.meta,

		isLoadingGetBooking,
		isRefetchingBooking,
		refetchBooking,
		page,
	};
};

export default useBooking;