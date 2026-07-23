import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Manage Users"
			description="View, search, and manage all users across your organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
