"use client";

import useQueryParams from "@/components/hooks/useQueryParams";
import { socket } from "@/lib/socket";
import spaceServices from "@/services/space.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const useSpaceCard = () => {
	const { limit, page, search } = useQueryParams();

	const findAllSpace = async () => {
		const result = await spaceServices.getAllSpace({
			page,
			limit,
			search,
		});
		return result.data.data;
	};

	const {
		data: dataSpace,
		isRefetching: isRefetchingSpace,
		refetch: refetchSpace,
	} = useQuery({
		queryKey: ["getSpaces", limit, page, search],
		queryFn: findAllSpace,
	});

	console.log(dataSpace);

	useEffect(() => {
		socket.on("spaceCreated", refetchSpace);
		socket.on("spaceUpdated", refetchSpace);
		socket.on("spaceDeleted", refetchSpace);
		socket.on("occupancyUpdated", refetchSpace);

		return () => {
			socket.off("spaceCreated", refetchSpace);
			socket.off("spaceUpdated", refetchSpace);
			socket.off("spaceDeleted", refetchSpace);
			socket.off("occupancyUpdated", refetchSpace);
		};
	}, [refetchSpace]);

	return {
		dataSpace,
		isRefetchingSpace,
		refetchSpace,
	};
};

export default useSpaceCard;
