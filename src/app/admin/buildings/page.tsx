import { Suspense } from "react";
import type { Metadata } from "next";

import Building from "@/components/view/Admin/Buildings";

export const metadata: Metadata = {
	title: "Buildings",
};

export default function BuildingPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Building />
		</Suspense>
	);
}