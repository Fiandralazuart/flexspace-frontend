import bookingServices from "@/services/booking.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteBookingModal = () => {
	const deleteBooking = async (id: string) => {
		const result = await bookingServices.deleteBooking(id);

		return result;
	};

	const {
		mutate: mutateDeleteBooking,
		isPending: isPendingDeleteBooking,
		isSuccess: isSuccessDeleteBooking,
	} = useMutation({
		mutationFn: deleteBooking,
		onSuccess: () => {
			toast.success("Booking deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete booking");
		},
	});

	const handleDeleteBooking = (id: string) => {
		mutateDeleteBooking(id);
	};

	return {
		handleDeleteBooking,
		isPendingDeleteBooking,
		isSuccessDeleteBooking,
	};
};

export default useDeleteBookingModal;