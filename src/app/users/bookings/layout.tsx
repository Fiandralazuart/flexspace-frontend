import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			type="member"
			title="Access Bookings"
			description="View, search, and access all bookings across this organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
