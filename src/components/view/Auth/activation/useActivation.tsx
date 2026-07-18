"use client";

import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import authServices from "@/services/auth.service";

const useActivation = () => {
	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	const activationMutation = useMutation({
		mutationFn: () => authServices.activation(token!),
	});

	useEffect(() => {
		if (token) {
			activationMutation.mutate();
		}
	}, [token]);

	return {
		isPending: activationMutation.isPending,
		isSuccess: activationMutation.isSuccess,
		isError: activationMutation.isError,
	};
};

export default useActivation;