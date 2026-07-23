import Analytic from "@/components/view/Admin/Analytic";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Analityc Dashboard",
};

export default function DashboardPage() {
	return <Analytic />;
}
