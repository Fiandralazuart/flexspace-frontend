import { Metadata } from "next";
import BookingView from "@/components/view/Admin/Booking";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Bookings",
};

export default function BuildingPage() {
	<Suspense fallback={null}>
		return <BookingView />
	</Suspense>;
}
