import { Activity, Cctv, Cpu, Rocket, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const UpdateHandle = () => {
	return (
		<div className="flex min-h-[75vh] items-center justify-center p-6">
			<Card className="relative w-full max-w-5xl overflow-hidden">
				{/* Background glow */}
				<div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
				<div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />

				{/* Badge - pojok kanan atas, tidak menabrak konten */}
				<Badge
					variant="outline"
					className="
						absolute right-5 top-5 z-10
						gap-1.5
						border-amber-200
						bg-amber-50
						px-3 py-3
						text-xs font-semibold
						tracking-wide
						text-amber-700
						shadow-sm
						hover:bg-amber-100
						dark:border-amber-900
						dark:bg-amber-950/40
						dark:text-amber-300
					"
				>
					<Sparkles className="h-3.5 w-3.5" />
					UNDER DEVELOPMENT
				</Badge>

				<CardHeader className="relative flex flex-col items-center gap-6 pb-2 pt-16 text-center">
					{/* Rocket icon - selalu center */}
					<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
						<Rocket className="h-10 w-10 text-white" />
					</div>

					<div className="flex flex-col items-center gap-3">
						<h1 className="bg-gradient-to-r from-primary via-sky-500 to-cyan-500 bg-clip-text text-4xl font-extrabold tracking-[0.18em] text-transparent sm:text-5xl md:text-6xl">
							COMING SOON
						</h1>

						<CardTitle className="text-2xl sm:text-3xl">
							We&apos;re Building Something Great
						</CardTitle>

						<CardDescription className="max-w-2xl text-base leading-7">
							This feature is currently under development.
							We&apos;re working hard to deliver a better
							experience for FlexSpace.
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="relative pb-10 pt-6">
					<div className="mb-8 flex flex-wrap items-center justify-center gap-8">
						<div className="flex items-center gap-2">
							<Cctv className="h-5 w-5 text-primary" />
							<span className="text-sm font-medium">
								Occupancy Detection
							</span>
						</div>

						<div className="hidden h-5 w-px bg-border md:block" />

						<div className="flex items-center gap-2">
							<Cpu className="h-5 w-5 text-primary" />
							<span className="text-sm font-medium">
								IoT Automation
							</span>
						</div>

						<div className="hidden h-5 w-px bg-border md:block" />

						<div className="flex items-center gap-2">
							<Activity className="h-5 w-5 text-primary" />
							<span className="text-sm font-medium">
								Real-time Monitoring
							</span>
						</div>
					</div>
					<div className="grid gap-5 md:grid-cols-3">
						<div className="rounded-xl border p-5 text-center transition hover:border-primary/40 hover:shadow-sm md:text-left">
							<div className="mb-3 text-2xl">🚀</div>
							<h3 className="font-semibold">New Features</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Exciting capabilities are currently being
								developed.
							</p>
						</div>

						<div className="rounded-xl border p-5 text-center transition hover:border-primary/40 hover:shadow-sm md:text-left">
							<div className="mb-3 text-2xl">⚡</div>
							<h3 className="font-semibold">Performance</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Faster loading times and smoother interactions.
							</p>
						</div>

						<div className="rounded-xl border p-5 text-center transition hover:border-primary/40 hover:shadow-sm md:text-left">
							<div className="mb-3 text-2xl">🎯</div>
							<h3 className="font-semibold">Better Experience</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								A cleaner interface with improved usability.
							</p>
						</div>
					</div>

					<div className="mt-8 flex justify-center">
						<p className="text-center text-sm text-muted-foreground">
							Thank you for your patience. This module will be
							available in a future release.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default UpdateHandle;
