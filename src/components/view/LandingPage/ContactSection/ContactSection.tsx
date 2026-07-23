import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ContactSection = () => {
	return (
		<section id="contact" className="pb-28">
			<div className="container mx-auto px-6">
				<Card className="relative overflow-hidden rounded-[32px] border border-blue-100 bg-white px-8 py-14 shadow-lg lg:px-14">
					<div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

					<div className="relative mx-auto max-w-3xl text-center">
						<div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
							Get Started
						</div>

						<h2 className="mt-6 text-4xl font-bold tracking-tight">
							Ready to Build
							<span className="text-blue-600">
								{" "}
								Smarter Spaces?
							</span>
						</h2>

						<p className="mt-5 text-lg leading-8 text-muted-foreground">
							Manage rooms, monitor occupancy, integrate IoT
							devices, and simplify workspace operations through
							one intelligent platform.
						</p>

						<div className="mt-10 flex flex-wrap justify-center gap-4">
							<Button size="lg">
								Get Started
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>

							<Button size="lg" variant="outline">
								Contact Sales
							</Button>
						</div>

						<div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
							<Mail className="h-4 w-4" />
							support@flexspace.id
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
};

export default ContactSection;
