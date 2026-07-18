"use client";

import Image from "next/image";
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
import useRegister from "./useRegister";
import { useRouter } from "next/navigation";

const RegisterView = () => {
	const {
		register,
		handleSubmit,
		isPendingRegister,
		errors,
		handleRegister,
		visible,
		setVisible,
	} = useRegister();

	const INPUT_CLASSNAME =
		"h-11 rounded-xl border-slate-300 text-black placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500";
	const router = useRouter();

	return (
		<div className="flex min-h-screen">
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
								Get Started
							</h1>

							<p className="max-w-md text-lg leading-8 text-slate-500">
								Build smarter workspaces with live occupancy
								insights, IoT-powered automation, and asset all
								in one platform.
							</p>
						</div>
					</div>

					<Card className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
						<CardHeader className="space-y-2">
							<CardTitle className="text-2xl font-bold text-slate-900">
								Sign Up
							</CardTitle>
							<CardDescription className="text-slate-500">
								Enter your credentials to continue.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5">
							<form
								onSubmit={handleSubmit(handleRegister)}
								className="space-y-5"
							>
								<div className="space-y-2">
									<Label
										htmlFor="name"
										className="font-medium text-slate-700"
									>
										Full Name
									</Label>
									<Input
										id="name"
										placeholder="John Doe"
										{...register("name")}
										className={INPUT_CLASSNAME}
									/>
									{errors.name && (
										<p className="text-sm text-red-500">
											{errors.name.message}
										</p>
									)}
								</div>

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
										className={INPUT_CLASSNAME}
									/>
									{errors.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="phone"
										className="font-medium text-slate-700"
									>
										Phone Number
									</Label>
									<Input
										id="phone"
										placeholder="+62 81234567890"
										{...register("phone")}
										className={INPUT_CLASSNAME}
									/>
									{errors.phone && (
										<p className="text-sm text-red-500">
											{errors.phone.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="password"
										className="font-medium text-slate-700"
									>
										Password
									</Label>

									<div className="relative">
										<Input
											id="password"
											type={visible ? "text" : "password"}
											placeholder="Create your password"
											{...register("password")}
											className={INPUT_CLASSNAME}
										/>

										<button
											type="button"
											onClick={() => setVisible(!visible)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
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

								<div className="space-y-2">
									<Label
										htmlFor="confirmPassword"
										className="font-medium text-slate-700"
									>
										Confirm Password
									</Label>

									<div className="relative">
										<Input
											id="confirmPassword"
											type={visible ? "text" : "password"}
											placeholder="Repeat your password"
											{...register("confirmPassword")}
											className={INPUT_CLASSNAME}
										/>

										<button
											type="button"
											onClick={() => setVisible(!visible)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
										>
											{visible ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>

									{errors.confirmPassword && (
										<p className="text-sm text-red-500">
											{errors.confirmPassword.message}
										</p>
									)}
								</div>

								{/* <div className="flex items-start gap-2">
									<input
										type="checkbox"
										id="terms"
										className="mt-1"
									/>

									<Label
										htmlFor="terms" 
										className="text-sm font-normal leading-6 text-slate-600"
									>
										I agree to the{" "}
										<span className="font-medium text-blue-600">
											Terms of Service
										</span>{" "}
										and{" "}
										<span className="font-medium text-blue-600">
											Privacy Policy
										</span>
										.
									</Label>
								</div> */}

								<Button
									type="submit"
									className="h-11 w-full rounded-xl bg-[#7C9CF5] hover:bg-[#6F8EF3]"
									disabled={isPendingRegister}
								>
									{isPendingRegister && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}

									{isPendingRegister
										? "Creating Account..."
										: "Create Account"}
								</Button>

								<p className="text-center text-sm text-slate-500">
									Already have an account?{" "}
									<button
										type="button"
										onClick={() => router.push("/login")}
										className="font-semibold text-blue-600 hover:text-blue-700"
									>
										Sign In
									</button>
								</p>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0891B2] px-12 text-white">
				{/* Glow */}
				<div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />

				{/* Grid */}
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
		</div>
	);
};

export default RegisterView;
