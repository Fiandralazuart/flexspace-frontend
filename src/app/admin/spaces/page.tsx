import { Suspense } from "react";
import type { Metadata } from "next";

import SpacesView from "@/components/view/Admin/Spaces";

export const metadata: Metadata = {
	title: "Spaces",
};

export default function SpacesPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SpacesView />
		</Suspense>
	);
}