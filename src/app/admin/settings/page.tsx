import { Metadata } from "next";
import UpdateHandle from "@/components/common/UpdateHandle";


export const metadata: Metadata = {
	title: "Settings",
};

export default function BuildingPage() {
	return <UpdateHandle />
}
