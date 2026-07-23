import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Analitics Dashboard"
			description="View, search, and manage all buildings across your organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
