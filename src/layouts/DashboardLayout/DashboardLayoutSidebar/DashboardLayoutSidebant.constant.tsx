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
	History,
	User,
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
		key: "analytics",
		label: "Analytics",
		href: "/admin/analytics",
		icon: ChartColumn,
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
		key: "settings",
		label: "Settings",
		href: "/admin/settings",
		icon: Settings,
	},
];

export interface SidebarItem {
	key: string;
	label: string;
	href: string;
	icon: LucideIcon;
}

export const userSidebar: SidebarItem[] = [
	{
		key: "dashboard",
		label: "Dashboard",
		href: "/users/dashboard",
		icon: LayoutDashboard,
	},
	{
		key: "space",
		label: "Spaces",
		href: "/users/spaces",
		icon: Building2,
	},
	{
		key: "assets",
		label: "Assets",
		href: "/users/assets",
		icon: Package,
	},
	{
		key: "bookings",
		label: "Bookings",
		href: "/users/bookings",
		icon: CalendarDays,
	},
	{
		key: "history",
		label: "History",
		href: "/users/history",
		icon: History,
	},
	{
		key: "profile",
		label: "Profile",
		href: "/users/profile",
		icon: User,
	},
];
