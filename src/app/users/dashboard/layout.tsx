import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			type="member"
			title="Dashboard"
			description="View, search, and access dashboard of this organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
