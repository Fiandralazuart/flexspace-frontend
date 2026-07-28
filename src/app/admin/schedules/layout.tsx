import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Manage Schedule"
			description="View, search, and access all schedule across this organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}

