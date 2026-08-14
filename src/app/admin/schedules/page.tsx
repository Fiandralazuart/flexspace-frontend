import { Metadata } from "next";
import ScheduleView from "@/components/view/Admin/Schedules";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Schedules",
};

export default function BuildingPage() {
	return (
		<Suspense fallback={null}>
			<ScheduleView />;
		</Suspense>
	);
}
