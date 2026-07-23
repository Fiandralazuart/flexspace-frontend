import UpdateHandle from "@/components/common/UpdateHandle";
import LandingPage from "@/components/view/LandingPage";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex justify-center items-center min-h-svh">
			<LandingPage />
		</div>
	);
}
