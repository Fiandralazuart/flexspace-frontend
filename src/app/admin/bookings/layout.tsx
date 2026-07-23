import DashboardLayout from "@/layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardLayout
			title="Manage Bookings"
			description="View, search, and manage all bookings across your organization."
			status="Live"
		>
			{children}
		</DashboardLayout>
	);
}
