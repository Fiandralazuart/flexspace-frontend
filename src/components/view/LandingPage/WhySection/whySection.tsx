import {
	BrainCircuit,
	CalendarCheck2,
	ChartSpline,
	HouseWifi,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
	{
		title: "AI Occupancy",
		description:
			"Monitor room occupancy in real time using intelligent computer vision.",
		icon: BrainCircuit,
	},
	{
		title: "Smart Booking",
		description:
			"Reserve meeting rooms with live availability and seamless scheduling.",
		icon: CalendarCheck2,
	},
	{
		title: "IoT Integration",
		description:
			"Control lighting, air conditioning, and connected devices remotely.",
		icon: HouseWifi,
	},
	{
		title: "Analytics",
		description:
			"Gain valuable insights with utilization reports and operational analytics.",
		icon: ChartSpline,
	},
];

const WhySection = () => {
	return (
		<section id="why" className="relative overflow-hidden scroll-mt-28">
			<div className="absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

				<div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />
			</div>

			<div className="container mx-auto flex min-h-[90vh] items-center px-6">
				<div className="w-full">
					<div className="mx-auto max-w-2xl text-center">
						<div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
							Why FlexSpace
						</div>

						<h2 className="mt-6 text-4xl font-bold tracking-tight">
							Everything You Need
							<span className="text-blue-600">
								{" "}
								in One Platform
							</span>
						</h2>

						<p className="mt-5 text-lg leading-8 text-muted-foreground">
							FlexSpace combines AI, booking management, IoT
							integration, and analytics into one modern workspace
							platform.
						</p>
					</div>

					<div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
						{features.map((feature) => {
							const Icon = feature.icon;

							return (
								<Card
									key={feature.title}
									className="group rounded-2xl border border-blue-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
										<Icon className="h-6 w-6" />
									</div>

									<h3 className="mt-5 text-lg font-semibold">
										{feature.title}
									</h3>

									<p className="mt-3 text-sm leading-6 text-muted-foreground">
										{feature.description}
									</p>
								</Card>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhySection;
