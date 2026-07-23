import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			type="member"
			title="Access Assets"
			description="View, search, and access all assets across this organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
