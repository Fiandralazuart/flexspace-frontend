"use client";

import { Suspense } from "react";
import useActivation from "./useActivation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const ActivationContent = () => {
	const { isPending, isSuccess } = useActivation();

	if (isPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
				<div className="flex flex-col items-center gap-6 text-center">
					<Image
						src="/images/logo.png"
						alt="FlexSpace"
						width={80}
						height={80}
						className="animate-pulse"
					/>

					<Loader2 className="h-10 w-10 animate-spin text-blue-600" />

					<h1 className="text-3xl font-bold text-slate-900">
						Activating Your Account
					</h1>

					<p className="max-w-md text-slate-500">
						Please wait while we verify your activation link.
					</p>
				</div>
			</div>
		);
	}

	const image = isSuccess
		? "/images/activationSuccess-new.png"
		: "/images/activationFailed-new.png";

	const title = isSuccess ? "Account Activated" : "Activation Failed";

	const description = isSuccess
		? "Your account has been activated successfully. You can now sign in to FlexSpace and start managing your spaces."
		: "This activation link is invalid or has expired. Please request a new activation email and try again.";

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
			<div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white px-10 py-12 text-center shadow-xl">
				<Image
					src={image}
					alt={title}
					width={300}
					height={300}
					priority
					className="mx-auto"
				/>

				<h1 className="mt-8 text-4xl font-bold text-slate-900">
					{title}
				</h1>

				<p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
					{description}
				</p>

				<div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
					<Link href="/" className="w-full sm:w-auto">
						<Button
							size="lg"
							className="h-12 w-full min-w-[180px] rounded-xl bg-gray-500 text-white hover:bg-slate-500"
						>
							Back Home
						</Button>
					</Link>

					{isSuccess && (
						<Link href="/login" className="w-full sm:w-auto">
							<Button
								size="lg"
								className="h-12 w-full min-w-[180px] rounded-xl bg-[#7C9CF5] text-white hover:bg-[#6D8EF0]"
							>
								Sign In
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

const Activation = () => {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-slate-50">
					<Loader2 className="h-10 w-10 animate-spin text-blue-600" />
				</div>
			}
		>
			<ActivationContent />
		</Suspense>
	);
};

export default Activation;