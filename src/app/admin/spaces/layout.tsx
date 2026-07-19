import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Manage Spaces"
			description="View, search, and manage all available spaces across your organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
