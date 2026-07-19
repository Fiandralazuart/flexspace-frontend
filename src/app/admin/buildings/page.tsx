import { Metadata } from "next";
import Building from "@/components/view/Admin/Buildings";


export const metadata: Metadata = {
	title: "Buildings",
};

export default function Spaces() {
	return <Building />
}
