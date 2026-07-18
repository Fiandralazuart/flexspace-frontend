import { Metadata } from "next";
import Activation from "@/components/view/Auth/activation";


export const metadata: Metadata = {
	title: "Activation",
};

export default function Login() {
	return <Activation />;
}
