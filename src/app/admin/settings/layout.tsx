import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Settings"
			description="View, search, and manage all Settings across your organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
