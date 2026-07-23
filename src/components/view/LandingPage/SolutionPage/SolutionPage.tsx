import { Card } from "@/components/ui/card";
import {
	Building2,
	Building,
	BriefcaseBusiness,
	GraduationCap,
	ArrowRight,
} from "lucide-react";

const solutions = [
	{
		title: "Universities",
		description:
			"Manage classrooms, laboratories, libraries, auditoriums, and campus facilities with centralized booking, AI-powered occupancy monitoring, and real-time utilization analytics.",
		icon: GraduationCap,
	},
	{
		title: "Companies",
		description:
			"Optimize meeting rooms, collaborative workspaces, and office facilities while monitoring occupancy and controlling connected IoT devices from one platform.",
		icon: BriefcaseBusiness,
	},
	{
		title: "Government Buildings",
		description:
			"Improve the management of public facilities, meeting rooms, and administrative offices with smart reservations, occupancy insights, and operational monitoring.",
		icon: Building,
	},
	{
		title: "Coworking Spaces",
		description:
			"Deliver seamless room reservations, live occupancy information, and smart facility management to enhance member experience and maximize space utilization.",
		icon: Building2,
	},
];

const SolutionSection = () => {
	return (
		<section id="solutions" className="scroll-mt-28 py-2">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mx-auto max-w-3xl text-center">
					<div className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-600">
						Solutions
					</div>

					<h2 className="mt-6 text-4xl font-bold tracking-tight">
						Built for Every
						<span className="text-blue-600"> Modern Workspace</span>
					</h2>

					<p className="mt-5 text-lg leading-8 text-muted-foreground">
						FlexSpace adapts to different environments, helping
						organizations manage spaces more efficiently through AI,
						IoT, and smart booking.
					</p>
				</div>

				<div className="mt-20 grid gap-8 lg:grid-cols-2">
					{solutions.map((solution) => {
						const Icon = solution.icon;

						return (
							<Card
								key={solution.title}
								className="group rounded-2xl border border-blue-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white">
									<Icon className="h-6 w-6" />
								</div>

								<h3 className="mt-5 text-xl font-semibold">
									{solution.title}
								</h3>

								<p className="mt-3 text-sm leading-6 text-muted-foreground">
									{solution.description}
								</p>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default SolutionSection;
