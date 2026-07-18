"use client";

import authServices from "@/services/auth.service";
import { IRegister } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z, email } from "zod";

export const registerSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(3, "Name must be at least 3 characters")
			.max(100, "Name must not exceed 100 characters"),

		email: email("Please enter your valid email address"),

		phone: z
			.string()
			.trim()
			.min(10, "Phone number must be at least 10 digits")
			.max(15, "Phone number must not exceed 15 digits")
			.regex(/^[0-9]+$/, "Phone number must contain only numbers"),

		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
			),

		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password confirmation does not match",
		path: ["confirmPassword"],
	});

const useRegister = () => {
	const router = useRouter();
	const registerServices = async (payload: IRegister) => {
		const result = await authServices.register(payload);

		return result;
	};

	const [visible, setVisible] = useState(false);
	const toogleVisible = () => setVisible(!visible);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const { mutate: mutateRegister, isPending: isPendingRegister } =
		useMutation({
			mutationFn: registerServices,
			onError: () => {
				toast.error("Failed to Register");
			},
			onSuccess: () => {
				toast.success("Successfully Register Your Account");
				router.push("/");
			},
		});

	const handleRegister = (data: IRegister) => mutateRegister(data);

	return {
		handleRegister,
		isPendingRegister,
		register,
		handleSubmit,
		errors,
		visible,
		setVisible,
	};
};

export default useRegister;
