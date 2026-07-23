import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			type="member"
			title="Access History"
			description="View, search, and access all history of your account."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
