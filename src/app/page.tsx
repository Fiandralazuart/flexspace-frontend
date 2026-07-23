import UpdateHandle from "@/components/common/UpdateHandle";
import AuthLayout from "@/layouts/AuthLayout";
import Image from "next/image";

export default function Home() {
	return (
		<AuthLayout>
			<div className="min-h-svh flex items-center justify-center">
				<UpdateHandle />
			</div>
		</AuthLayout>
	);
}
