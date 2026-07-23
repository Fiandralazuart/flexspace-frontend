import { Metadata } from "next";
import Building from "@/components/view/Admin/Buildings";
import Dashboard from "@/components/view/Admin/Dashboard/Dashboard";


export const metadata: Metadata = {
	title: "Analityc Dashboard",
};

export default function DashboardPage() {
	return <Dashboard />
}
