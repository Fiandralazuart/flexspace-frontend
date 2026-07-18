"use client";

import { ILogin } from "@/types/auth";
import { signIn } from "next-auth/react";
import { email, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
	email: email("Please enter your valid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/,
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
		),
});

const useLogin = () => {
	const router = useRouter()
	const loginServices = async (payload: ILogin) => {
		const result = await signIn("credentials", {
			...payload,
			redirect: false,
			callbackUrl: "/",
		});
		if (result?.error && result?.status === 401) {
			// throw new Error("Invalid Password for Your Email or Username")
			throw new Error("Invalid Password for Your Email or Username");
			return {
				success: false,
				message: "Invalid Password for Your Email or Username",
			};
		}
	};

	const [visible, setVisible] = useState(false);
	const toogleVisible = () => setVisible(!visible);

	const { register, reset, handleSubmit, formState: {errors} } = useForm({
		resolver: zodResolver(loginSchema),
	});

	const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
		mutationFn: loginServices,
		onError: () => {
			toast.error("Failed to Login");
		},
		onSuccess: () => {
			toast.success("Successfully Login");
			router.push("/")
		},
	});

	const handleLogin = (data: ILogin) => mutateLogin(data);

	return {
		register,
		reset,
		handleSubmit,
		errors,
		isPendingLogin,
		handleLogin,
		visible,
		setVisible,
	};
};

export default useLogin;
