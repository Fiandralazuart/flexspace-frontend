import { Metadata } from "next";
import DetailBuilding from "@/components/view/Admin/DetailBuilding";
import DetailSchedule from "@/components/view/Admin/DetailSchedule/DetailSchedule";


export const metadata: Metadata = {
	title: "Details Schedule",
};

export default function Spaces() {
	return <DetailSchedule />
}
