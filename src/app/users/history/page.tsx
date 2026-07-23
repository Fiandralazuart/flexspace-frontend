import { Metadata } from "next";
import UpdateHandle from "@/components/common/UpdateHandle";


export const metadata: Metadata = {
	title: "History",
};

export default function BuildingPage() {
	return <UpdateHandle />
}
