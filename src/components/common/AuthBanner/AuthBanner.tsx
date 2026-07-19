import { Boxes, CalendarDays, ChartColumn, Lightbulb } from "lucide-react";
import Image from "next/image";

const AuthBanner = () => {
	return (
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
					integration, intelligent reservations, and unified workspace
					management.
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
	);
};

export default AuthBanner
