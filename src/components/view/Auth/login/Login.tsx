"use client";

import Image from "next/image";
import useLogin from "./useLogin";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Boxes,
	CalendarDays,
	ChartColumn,
	Eye,
	EyeOff,
	Lightbulb,
	Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginView = () => {
	const {
		register,
		reset,
		handleSubmit,
		isPendingLogin,
		errors,
		handleLogin,
		visible,
		setVisible,
	} = useLogin();

	const router = useRouter();

	return (
		<div className="flex min-h-screen">
			<div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0891B2] px-12 text-white">
				<div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />
				<div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage: `
				linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
				linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
			`,
						backgroundSize: "48px 48px",
					}}
				/>

				<div className="relative z-10 flex max-w-xl flex-col items-center text-center">
					<Image
						src="/images/image1.png"
						alt="FlexSpace"
						width={480}
						height={420}
					/>

					<h1 className="text-3xl font-bold leading-tight">
						Smart Spaces
						<br />
						Better Operations
					</h1>

					<p className="mt-3 mb-8 max-w-lg text-lg leading-8 text-blue-100">
						Empower smarter spaces with real-time monitoring, IoT
						integration, intelligent reservations, and unified
						workspace management.
					</p>

					<div className="flex flex-wrap justify-center gap-3">
						<div className="flex h-11 w-44 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
							<CalendarDays className="h-4 w-4" />
							<span className="text-sm">Smart Booking</span>
						</div>

						<div className="flex h-11 w-44 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
							<Boxes className="h-4 w-4" />
							<span className="text-sm">Asset Management</span>
						</div>

						<div className="flex h-11 w-44 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
							<Lightbulb className="h-4 w-4" />
							<span className="text-sm">IoT Control</span>
						</div>

						<div className="flex h-11 w-44 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
							<ChartColumn className="h-4 w-4" />
							<span className="text-sm">Live Analytics</span>
						</div>
					</div>

					<div className="mt-12 w-full border-t border-white/10 pt-6 text-center text-sm text-blue-100">
						Trusted for{" "}
						<span className="font-semibold text-white">
							smarter space management
						</span>{" "}
						across modern workplaces.
					</div>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center bg-white">
				<div className="w-full max-w-md space-y-10">
					<div>
						<div className="flex items-center gap-2">
							<Image
								src="/images/logo.png"
								alt="FlexSpace"
								width={40}
								height={40}
							/>
							<span className="text-2xl font-bold text-black">
								FlexSpace
							</span>
						</div>
						<div className="mt-8 space-y-2">
							<h1 className="text-4xl font-bold tracking-tight text-black">
								Welcome back
							</h1>
							<p className="max-w-md text-lg leading-8 text-slate-500">
								Sign in to your FlexSpace account and continue
								managing your smart spaces with ease.
							</p>
						</div>
					</div>

					<Card className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
						<CardHeader className="space-y-2">
							<CardTitle className="text-2xl font-bold text-slate-900">
								Sign In
							</CardTitle>
							<CardDescription className="text-slate-500">
								Enter your credentials to continue.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5 gap-2">
							<form onSubmit={handleSubmit(handleLogin)}>
								<div className="space-y-2">
									<Label
										htmlFor="email"
										className="font-medium text-slate-700"
									>
										Email address
									</Label>
									<Input
										id="email"
										placeholder="you@campus.edu"
										{...register("email")}
										className="h-11 rounded-xl border-slate-300 text-black placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500"
									/>
									{errors.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>
								<div className="space-y-2 mt-3">
									<div className="flex items-center justify-between">
										<Label
											htmlFor="password"
											className="font-medium text-slate-700"
										>
											Password
										</Label>
										<button
											type="button"
											className="text-sm font-medium text-blue-600 hover:text-blue-700"
										>
											Forgot password?
										</button>
									</div>
									<div className="relative">
										<Input
											id="password"
											type={visible ? "text" : "password"}
											placeholder="Enter your password"
											{...register("password")}
											className="h-11 rounded-xl border-slate-300 text-black pr-10 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500"
										/>
										<button
											type="button"
											onClick={() => setVisible(!visible)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
										>
											{visible ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>
									{errors.password && (
										<p className="text-sm text-red-500">
											{errors.password.message}
										</p>
									)}
								</div>
								<Button
									type="submit"
									className="h-11 mt-3 w-full rounded-xl bg-[#7C9CF5] text-white hover:bg-[#6F8EF3]"
									disabled={isPendingLogin}
								>
									{isPendingLogin && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}

									{isPendingLogin
										? "Signing In..."
										: "Sign In"}
								</Button>

								<p className="text-center text-sm mt-4 text-slate-500">
									Don't have any account?{" "}
									<button
										type="button"
										onClick={() => router.push("/register")}
										className="font-semibold text-blue-600 hover:text-blue-700"
									>
										Register Here
									</button>
								</p>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default LoginView;
