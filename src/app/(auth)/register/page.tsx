import { Metadata } from "next";
import RegisterView from "@/components/view/Auth/register";


export const metadata: Metadata = {
	title: "Register",
};

export default function Login() {
	return <RegisterView />;
}
