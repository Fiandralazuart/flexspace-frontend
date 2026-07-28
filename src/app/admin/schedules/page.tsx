import { Metadata } from "next";
import ScheduleView from "@/components/view/Admin/Schedules";

export const metadata: Metadata = {
	title: "Schedules",
};

export default function BuildingPage() {
	return <ScheduleView />;
}
