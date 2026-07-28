import bookingServices from "@/services/booking.service";
import spaceServices from "@/services/space.service";
import { BookingStatus, IUpdateBookingPayload } from "@/types/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const updateBookingSchema = z.object({
	spaceId: z.string().min(1, "Space is required"),
	status: z.nativeEnum(BookingStatus),
	adminNote: z.string().optional(),
});

export type UpdateBookingDTO = z.infer<typeof updateBookingSchema>;

interface Props {
	id: string;
	spaceId: string;
	status: BookingStatus;
	adminNote?: string;
}

const useUpdateBooking = ({ id, spaceId, status, adminNote }: Props) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<UpdateBookingDTO>({
		resolver: zodResolver(updateBookingSchema),
		defaultValues: {
			spaceId,
			status,
			adminNote: adminNote ?? "",
		},
	});

	useEffect(() => {
		reset({
			spaceId,
			status,
			adminNote: adminNote ?? "",
		});
	}, [spaceId, status, adminNote, reset]);

	const getSpaces = async () => {
		const response = await spaceServices.getAllSpace({
			page: 1,
			limit: 100,
		});

		return response.data.data.data;
	};

	const { data: spaces, isLoading: isLoadingSpaces } = useQuery({
		queryKey: ["spaces"],
		queryFn: getSpaces,
	});

	const updateBooking = async (payload: UpdateBookingDTO) => {
		const updatePayload: IUpdateBookingPayload = {
			spaceId: payload.spaceId,
			status: payload.status,
			adminNote: payload.adminNote,
		};

		return bookingServices.updateBooking(updatePayload, id);
	};

	const {
		mutate: mutateUpdateBooking,
		isPending: isPendingUpdateBooking,
		isSuccess: isSuccessUpdateBooking,
	} = useMutation({
		mutationFn: updateBooking,
		onSuccess: () => {
			toast.success("Booking updated successfully");
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const handleUpdateBooking = (data: UpdateBookingDTO) => {
		mutateUpdateBooking(data);
	};

	return {
		control,
		errors,
		handleSubmit,
		reset,

		spaces,
		isLoadingSpaces,

		handleUpdateBooking,

		isPendingUpdateBooking,
		isSuccessUpdateBooking,
	};
};

export default useUpdateBooking;
