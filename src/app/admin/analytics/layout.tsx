import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="View Analytics"
			description="View, search, and manage all Analytics across your organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
