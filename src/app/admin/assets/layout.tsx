import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Manage Assets"
			description="View, search, and manage all assets across your organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
