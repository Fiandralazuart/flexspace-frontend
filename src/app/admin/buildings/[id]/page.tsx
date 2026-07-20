import { Metadata } from "next";
import DetailBuilding from "@/components/view/Admin/DetailBuilding";


export const metadata: Metadata = {
	title: "Details Building",
};

export default function Spaces() {
	return <DetailBuilding />
}
