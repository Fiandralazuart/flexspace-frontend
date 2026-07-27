import { Suspense } from "react";
import type { Metadata } from "next";
import Dashboard from "@/components/view/Users/Dashboard";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function userDashboardPage() {
	return (
			<Dashboard />
	);
}