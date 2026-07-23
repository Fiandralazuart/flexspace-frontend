"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useLandingHeader from "../LandingHeader/useLandingHeader";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
	const { isAuthenticated, isLoading, dashboardUrl } = useLandingHeader();
	return (
		<section id="hero" className="relative overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

				<div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

				<div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />
			</div>

			<div className="container mx-auto flex min-h-screen items-center px-6 pt-24">
				<div className="grid w-full items-center gap-16 lg:grid-cols-2">
					<div className="max-w-2xl">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
							<Sparkles className="h-3.5 w-3.5 text-primary" />

							<span>AI Powered Smart Space Platform</span>
						</div>

						<h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
							Manage Your{" "}
							<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
								Smart Spaces
							</span>
							<br />
							from One Platform
						</h1>

						<p className="mt-6 text-base leading-7 text-muted-foreground">
							Monitor occupancy, simplify room bookings, manage
							IoT devices, and gain real-time operational insights
							with FlexSpace.
						</p>

						<div className="mt-8 flex items-center gap-3">
							{isLoading ? (
								<>
									<Skeleton className="h-11 w-36 rounded-xl" />
									<Skeleton className="h-11 w-24 rounded-xl" />
								</>
							) : isAuthenticated ? (
								<Link href={dashboardUrl}>
									<Button className="h-11 rounded-xl px-6">
										Go to Dashboard
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							) : (
								<>
									<Link href="/register">
										<Button className="h-11 rounded-xl px-6">
											Get Started
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</Link>

									<Link href="/login">
										<Button
											variant="outline"
											className="h-11 rounded-xl px-6"
										>
											Login
										</Button>
									</Link>
								</>
							)}
						</div>

						<div className="mt-12 flex gap-10">
							<div>
								<h3 className="text-2xl font-semibold text-primary">
									120+
								</h3>

								<p className="mt-1 text-sm text-muted-foreground">
									Managed Spaces
								</p>
							</div>

							<div>
								<h3 className="text-2xl font-semibold text-primary">
									25K+
								</h3>

								<p className="mt-1 text-sm text-muted-foreground">
									Bookings
								</p>
							</div>

							<div>
								<h3 className="text-2xl font-semibold text-primary">
									99.9%
								</h3>

								<p className="mt-1 text-sm text-muted-foreground">
									System Uptime
								</p>
							</div>
						</div>
					</div>

					<div className="relative">
						<Card className="overflow-hidden rounded-3xl border bg-background shadow-2xl shadow-blue-500/10">
							<div className="flex h-12 items-center gap-2 border-b px-5">
								<div className="h-3 w-3 rounded-full bg-red-400" />
								<div className="h-3 w-3 rounded-full bg-yellow-400" />
								<div className="h-3 w-3 rounded-full bg-green-400" />
							</div>

							<div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-blue-50 to-background dark:from-slate-900">
								<div className="text-center">
									<h2 className="text-2xl font-semibold">
										FlexSpace Dashboard
									</h2>

									<p className="mt-2 text-sm text-muted-foreground">
										Replace this section with your dashboard
										preview.
									</p>
								</div>
							</div>
						</Card>

						<Card className="absolute -bottom-5 left-6 rounded-2xl px-5 py-4 shadow-lg">
							<p className="text-xl font-semibold text-primary">
								95%
							</p>

							<p className="text-xs text-muted-foreground">
								Space Utilization
							</p>
						</Card>

						<Card className="absolute right-6 top-10 rounded-2xl px-5 py-4 shadow-lg">
							<p className="text-xl font-semibold text-cyan-500">
								AI
							</p>

							<p className="text-xs text-muted-foreground">
								Real-time Detection
							</p>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
