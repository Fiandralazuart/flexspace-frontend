"use client";

import useQueryParams from "@/components/hooks/useQueryParams";
import { socket } from "@/lib/socket";
import bookingServices from "@/services/booking.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useBooking = () => {
	const { limit, page, search } = useQueryParams();

	const findAllBooking = async () => {
		const result = await bookingServices.getAllMe({
			page,
			limit,
			search,
		});

		return result.data.data;
	};

	const {
		data: dataBooking,
		isLoading: isLoadingBooking,
		isRefetching: isRefetchingBooking,
		refetch: refetchBooking,
	} = useQuery({
		queryKey: ["getBookings", limit, page, search],
		queryFn: findAllBooking,
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
		dataBooking,
		isLoadingBooking,
		isRefetchingBooking,
		refetchBooking,
	};
};

export default useBooking;