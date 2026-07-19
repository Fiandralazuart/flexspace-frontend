import SpacesView from "@/components/view/Admin/Spaces";
import { Metadata } from "next";


export const metadata: Metadata = {
	title: "Spaces",
};

export default function Spaces() {
	return <SpacesView/>
}
