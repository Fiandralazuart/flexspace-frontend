import { ArrowUpRight, BarChart3, Cctv, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AboutSection = () => {
	return (
		<section id="about" className="relative overflow-hidden scroll-mt-28">
			<div className="container mx-auto flex min-h-[90vh] items-center px-6">
				<div className="grid w-full items-center gap-16 lg:grid-cols-[0.45fr_0.55fr]">
					<div>
						<div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
							About FlexSpace
						</div>

						<h2 className="mt-6 text-4xl font-bold tracking-tight">
							One Platform for
							<span className="text-blue-600">
								{" "}
								Smarter Space Management
							</span>
						</h2>

						<p className="mt-6 text-lg leading-8 text-muted-foreground">
							FlexSpace is a Smart Space Management platform that
							combines AI-powered occupancy monitoring,
							intelligent room booking, IoT integration, and
							analytics into a single, centralized dashboard.
						</p>

						<div className="mt-10 space-y-6">
							<div className="flex gap-4">
								<div className="rounded-xl bg-blue-50 p-3 text-blue-600">
									<LayoutDashboard className="h-5 w-5" />
								</div>

								<div>
									<h4 className="font-semibold">
										Centralized Dashboard
									</h4>

									<p className="mt-1 text-sm text-muted-foreground">
										Monitor buildings, spaces, bookings,
										assets, and connected devices from one
										place.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="rounded-xl bg-blue-50 p-3 text-blue-600">
									<Cctv className="h-5 w-5" />
								</div>

								<div>
									<h4 className="font-semibold">
										AI Monitoring
									</h4>

									<p className="mt-1 text-sm text-muted-foreground">
										Receive live occupancy information
										powered by computer vision.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="rounded-xl bg-blue-50 p-3 text-blue-600">
									<BarChart3 className="h-5 w-5" />
								</div>

								<div>
									<h4 className="font-semibold">
										Operational Insights
									</h4>

									<p className="mt-1 text-sm text-muted-foreground">
										Understand usage trends and improve
										operational efficiency with actionable
										analytics.
									</p>
								</div>
							</div>
						</div>

						<Button className="mt-10">
							Explore Dashboard
							<ArrowUpRight className="ml-2 h-4 w-4" />
						</Button>
					</div>

					<div className="relative">
						<div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/15 to-cyan-500/10 blur-3xl" />

						<Card className="relative overflow-hidden rounded-[28px] border border-blue-100 shadow-2xl shadow-blue-100">
							<div className="flex items-center gap-2 border-b bg-slate-50 px-5 py-4">
								<div className="h-3 w-3 rounded-full bg-red-400" />
								<div className="h-3 w-3 rounded-full bg-yellow-400" />
								<div className="h-3 w-3 rounded-full bg-green-400" />
							</div>

							<div className="aspect-[16/8] bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-6">
								<div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-blue-200">
									<div className="text-center">
										<LayoutDashboard className="mx-auto h-14 w-14 text-blue-600" />

										<h3 className="mt-5 text-2xl font-semibold">
											Dashboard Preview
										</h3>

										<p className="mt-3 text-sm text-muted-foreground">
											Replace this placeholder with your
											actual FlexSpace dashboard
											screenshot.
										</p>
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
