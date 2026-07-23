"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import useLandingHeader from "./useLandingHeader";

const menus = [
	{
		title: "Home",
		href: "#hero",
	},
	{
		title: "Why FlexSpace",
		href: "#why",
	},
	{
		title: "Solutions",
		href: "#solutions",
	},
	{
		title: "About",
		href: "#about",
	},
	{
		title: "Contact",
		href: "#contact",
	},
];

const LandingNavbar = () => {
	const { isLoading, isAuthenticated, dashboardUrl } = useLandingHeader();

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div className="mx-auto mt-5 flex w-[95%] max-w-7xl items-center justify-between rounded-2xl border border-blue-100/60 bg-white/80 px-6 py-3 backdrop-blur-xl shadow-lg">
				<Link href="/" className="flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600">
						<span className="text-lg font-bold text-white">F</span>
					</div>

					<div>
						<h1 className="text-lg font-bold tracking-tight">
							FlexSpace
						</h1>

						<p className="text-xs text-muted-foreground">
							Smart Space Management
						</p>
					</div>
				</Link>

				<nav className="hidden items-center gap-8 lg:flex">
					{menus.map((menu) => (
						<Link
							key={menu.title}
							href={menu.href}
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
						>
							{menu.title}
						</Link>
					))}
				</nav>

				{!isLoading && (
					<div className="hidden items-center gap-3 lg:flex">
						{isAuthenticated ? (
							<Link href={dashboardUrl}>
								<Button className="h-11 rounded-xl px-6">
									Dashboard
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						) : (
							<>
								<Link href="/login">
									<Button variant="ghost" className="p-4">
										Login
									</Button>
								</Link>

								<Link href="/register">
									<Button className="p-4">Get Started</Button>
								</Link>
							</>
						)}
					</div>
				)}

				<Button size="icon" variant="ghost" className="lg:hidden">
					<Menu className="h-5 w-5" />
				</Button>
			</div>
		</header>
	);
};

export default LandingNavbar;
