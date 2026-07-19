"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarItem } from "./DashboardLayoutSidebant.constant";

interface Props {
	sidebarItems: SidebarItem[];
	isOpen: boolean;
}

export default function DashboardLayoutSidebar({
	sidebarItems,
	isOpen,
}: Props) {
	const pathname = usePathname();
	const { data: session } = useSession();

	const initials = session?.user?.name?.charAt(0).toUpperCase() ?? "A";

	const formatRole = (role?: string) => {
		if (!role) return "Administrator";

		return role
			.toLowerCase()
			.replace(/_/g, " ")
			.replace(/\b\w/g, (char) => char.toUpperCase());
	};

	return (
		<aside
			className={cn(
				"fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 transition-transform lg:relative",
				{
					"-translate-x-full lg:translate-x-0": !isOpen,
					"translate-x-0": isOpen,
				},
			)}
		>
			<div className="px-6 pt-6">
				<Link href="/" className="flex items-center gap-3">
					<Image
						src="/images/logo.png"
						alt="FlexSpace"
						width={42}
						height={42}
					/>
					<div>
						<h1 className="text-lg font-bold text-white">
							FlexSpace
						</h1>

						<p className="text-xs text-slate-400">
							Smart Space Management
						</p>
					</div>
				</Link>
			</div>

			<div className="mt-8 px-4">
				<div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-800 p-3 transition hover:bg-slate-800">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
							{initials}
						</div>
						<div>
							<h2 className="text-sm font-semibold text-white">
								{session?.user?.name || "Administrator"}
							</h2>
							<p className="text-xs text-slate-400">
								{formatRole(session?.user?.role?.name)}
							</p>
						</div>
					</div>
					<ChevronRight size={18} className="text-slate-500" />
				</div>
			</div>

			<div className="mt-5 px-4">
				<div className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2">
					<Search size={18} className="text-slate-500" />
					<input
						type="text"
						placeholder="Quick search..."
						className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
					/>
				</div>
			</div>

			<div className="mt-8 flex-1">
				<p className="mb-3 px-6 text-xs font-semibold uppercase tracking-widest text-slate-500">
					Menu
				</p>
				<div className="space-y-1 px-3">
					{sidebarItems.map((item) => {
						const Icon = item.icon;
						const active =
							pathname === item.href ||
							pathname.startsWith(item.href + "/");

						return (
							<Link
								key={item.key}
								href={item.href}
								className={cn(
									"group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200",
									active
										? "bg-blue-600 text-white"
										: "text-slate-400 hover:bg-slate-900 hover:text-white",
								)}
							>
								<div className="flex items-center gap-3">
									<Icon size={20} />
									<span className="text-sm font-medium">
										{item.label}
									</span>
								</div>
								{active && (
									<div className="h-2 w-2 rounded-full bg-white" />
								)}
							</Link>
						);
					})}
				</div>
			</div>

			<div className="border-t border-slate-800 p-4">
				<button
					onClick={() =>
						signOut({
							callbackUrl: "/login",
						})
					}
					className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-md font-medium text-slate-300 transition hover:bg-slate-900 hover:text-red-400"
				>
					<LogOut size={20} />
					Sign Out
				</button>
			</div>
		</aside>
	);
}
