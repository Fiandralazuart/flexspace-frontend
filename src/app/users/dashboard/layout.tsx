import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Explore Dashboard"
			description="View, search, and access all features across this organization."
			status="Live"
			type="member"
		>
			{children}
		</DashboardLayout>
	);
}

