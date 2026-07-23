import { Metadata } from "next";
import UpdateHandle from "@/components/common/UpdateHandle";


export const metadata: Metadata = {
	title: "Users",
};

export default function BuildingPage() {
	return <UpdateHandle />
}
