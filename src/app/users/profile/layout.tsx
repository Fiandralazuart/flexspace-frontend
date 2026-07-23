import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			type="member"
			title="Profile"
			description="View, search, and access all settings of your profile."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
