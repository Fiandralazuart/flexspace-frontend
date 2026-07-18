import { Metadata } from "next";
import LoginView from "@/components/view/Auth/login";


export const metadata: Metadata = {
	title: "Login",
};

export default function Login() {
	return <LoginView />;
}
