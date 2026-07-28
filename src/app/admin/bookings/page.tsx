import { Metadata } from "next";
import BookingView from "@/components/view/Admin/Booking";


export const metadata: Metadata = {
	title: "Bookings",
};

export default function BuildingPage() {
	return <BookingView />
}
