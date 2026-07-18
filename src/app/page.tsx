import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";

export default function Home() {
	return (
		<AuthLayout>
			<p className="text-red-200">Hello</p>
		</AuthLayout>
	);
}
