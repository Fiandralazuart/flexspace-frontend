import type { LucideIcon } from "lucide-react";
import {
	LayoutDashboard,
	Building,
	Building2,
	CalendarDays,
	Package,
	Users,
	ChartColumn,
	Settings,
} from "lucide-react";

export interface SidebarItem {
	key: string;
	label: string;
	href: string;
	icon: LucideIcon;
}

export const adminSidebar: SidebarItem[] = [
	{
		key: "dashboard",
		label: "Dashboard",
		href: "/admin/dashboard",
		icon: LayoutDashboard,
	},
	{
		key: "buildings",
		label: "Buildings",
		href: "/admin/buildings",
		icon: Building,
	},
	{
		key: "spaces",
		label: "Spaces",
		href: "/admin/spaces",
		icon: Building2,
	},
	{
		key: "bookings",
		label: "Bookings",
		href: "/admin/bookings",
		icon: CalendarDays,
	},
	{
		key: "assets",
		label: "Assets",
		href: "/admin/assets",
		icon: Package,
	},
	{
		key: "users",
		label: "Users",
		href: "/admin/users",
		icon: Users,
	},
	{
		key: "analytics",
		label: "Analytics",
		href: "/admin/analytics",
		icon: ChartColumn,
	},
	{
		key: "settings",
		label: "Settings",
		href: "/admin/settings",
		icon: Settings,
	},
];