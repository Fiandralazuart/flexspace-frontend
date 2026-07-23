"use client";

import { ReactNode, useState } from "react";
import { Menu, Search } from "lucide-react";

import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { adminSidebar } from "./DashboardLayoutSidebar/DashboardLayoutSidebant.constant";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
	title: string;
	description?: string;

	status?: string;

	type?: "admin" | "member";

	children: ReactNode;
}

const DashboardLayout = ({
	title,
	description,
	type = "admin",
	status,
	children,
}: DashboardLayoutProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden bg-slate-50">
			<DashboardLayoutSidebar
				sidebarItems={type === "admin" ? adminSidebar : adminSidebar}
				isOpen={isOpen}
			/>

			<main className="flex flex-1 flex-col min-w-0 overflow-hidden">
				{/* Header */}
				<header className="sticky top-0 z-20 border-b bg-white">
					<div className="flex h-20 items-center justify-between px-8">
						<div className="flex flex-1 items-center gap-3">
							<Button
								size="icon"
								variant="ghost"
								className="lg:hidden"
								onClick={() => setIsOpen(!isOpen)}
							>
								<Menu className="h-5 w-5" />
							</Button>
							<div className="relative w-full max-w-xl">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search rooms"
									className="w-full pl-10 pr-9 py-5 text-sm bg-slate-100 border border-transparent rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
								/>
							</div>
						</div>
					</div>
				</header>

				<div className="flex-1 overflow-y-auto min-w-0 p-8 py-4">
					{/* Main Title */}
					<div className=" flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold tracking-tight">
								{title}
							</h1>
							{description && (
								<p className="mt-2 text-muted-foreground">
									{description}
								</p>
							)}
						</div>
						{status && (
							<div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
								<div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
								<span>{status}</span>
							</div>
						)}
					</div>
					<div className="mt-8">{children}</div>
				</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
