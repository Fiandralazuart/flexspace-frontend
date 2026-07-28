import { useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";

import useDeleteBookingModal from "./useDeleteBookingModal";

interface PropsTypes {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchBooking: () => void;
	title: string;
	id: string;
}

const DeleteBookingModal = ({
	open,
	onOpenChange,
	refetchBooking,
	title,
	id,
}: PropsTypes) => {
	const {
		handleDeleteBooking,
		isPendingDeleteBooking,
		isSuccessDeleteBooking,
	} = useDeleteBookingModal();

	useEffect(() => {
		if (isSuccessDeleteBooking) {
			refetchBooking();
			onOpenChange(false);
		}
	}, [isSuccessDeleteBooking, refetchBooking, onOpenChange]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg overflow-hidden rounded-3xl p-0">
				<div className="border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-red-50 px-8 py-6">
					<div className="flex items-center gap-5">
						<div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-red-100">
							<AlertTriangle className="h-7 w-7 text-red-600" />
						</div>

						<div>
							<DialogTitle className="text-2xl font-bold text-red-700">
								Delete Booking
							</DialogTitle>

							<DialogDescription className="mt-2">
								This action will permanently delete the selected
								booking.
							</DialogDescription>
						</div>
					</div>
				</div>

				<div className="space-y-6 bg-slate-50 px-8 py-6">
					<Card className="border-red-200 shadow-none">
						<CardContent className="space-y-3 p-5">
							<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								Selected Booking
							</p>

							<div className="rounded-xl border bg-white p-4">
								<p className="font-semibold">{title}</p>
							</div>
						</CardContent>
					</Card>

					<div className="rounded-2xl border border-red-200 bg-red-50 p-5">
						<div className="flex items-start gap-4">
							<div className="rounded-xl bg-red-100 p-3">
								<AlertTriangle className="h-5 w-5 text-red-600" />
							</div>

							<div>
								<h3 className="font-semibold text-red-700">
									Are you absolutely sure?
								</h3>

								<p className="mt-2 text-sm leading-6 text-muted-foreground">
									This action cannot be undone. The selected
									booking will be permanently removed from
									FlexSpace and any related data may no longer
									be accessible.
								</p>
							</div>
						</div>
					</div>
				</div>

				<DialogFooter className="border-t bg-white px-8 py-6">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isPendingDeleteBooking}
					>
						Cancel
					</Button>

					<Button
						variant="destructive"
						onClick={() => handleDeleteBooking(id)}
						disabled={isPendingDeleteBooking}
					>
						{isPendingDeleteBooking ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						) : (
							"Delete Booking"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteBookingModal;
