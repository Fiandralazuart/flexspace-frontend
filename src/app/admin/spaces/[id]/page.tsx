import { Suspense } from "react";
import type { Metadata } from "next";

import DetailsSpace from "@/components/view/Admin/DetailSpace";

export const metadata: Metadata = {
	title: "Details Building",
};

export default function Spaces() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DetailsSpace />
		</Suspense>
	);
}