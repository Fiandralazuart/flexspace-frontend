import { Metadata } from "next";
import LoginView from "@/components/view/Auth/login";
import Building from "@/components/view/Admin/Buildings";


export const metadata: Metadata = {
	title: "Buildings",
};

export default function Spaces() {
	return <Building />
}
