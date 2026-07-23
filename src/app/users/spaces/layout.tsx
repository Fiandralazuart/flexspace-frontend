import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			type="member"
			title="Access Spaces"
			description="View, search, and access all available spaces across this organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
