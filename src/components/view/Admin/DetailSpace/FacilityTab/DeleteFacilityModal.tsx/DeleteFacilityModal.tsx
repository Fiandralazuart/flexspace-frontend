"use client";

import { useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

import useDeleteFacilityModal from "./useDeleteFacilityModal";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchFacility: () => void;
	name: string;
	id: string;
}

const DeleteFacilityModal = ({
	open,
	onOpenChange,
	refetchFacility,
	name,
	id,
}: Props) => {
	const {
		handleDeleteFacility,
		isPendingDeleteFacility,
		isSuccessDeleteFacility,
	} = useDeleteFacilityModal();

	useEffect(() => {
		if (isSuccessDeleteFacility) {
			refetchFacility();
			onOpenChange(false);
		}
	}, [isSuccessDeleteFacility, refetchFacility, onOpenChange]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="font-bold text-red-600">
						Delete Facility
					</DialogTitle>

					<DialogDescription>
						This action will permanently delete the selected
						facility.
					</DialogDescription>
				</DialogHeader>

				<Separator />

				<div className="rounded-lg border border-red-200 bg-red-50 p-4">
					<div className="flex items-start gap-3">
						<div className="rounded-full bg-red-100 p-2">
							<AlertTriangle className="h-5 w-5 text-red-600" />
						</div>

						<div className="space-y-2">
							<h3 className="font-semibold text-red-700">
								Are you sure?
							</h3>

							<p className="text-sm text-muted-foreground">
								This action cannot be undone. The selected
								facility will be permanently removed from this
								device.
							</p>

							<div className="rounded-md border bg-white px-3 py-2">
								<p className="text-xs text-muted-foreground">
									Facility
								</p>

								<p>{name}</p>
							</div>
						</div>
					</div>
				</div>

				<Separator />

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isPendingDeleteFacility}
					>
						Cancel
					</Button>

					<Button
						type="button"
						variant="destructive"
						onClick={() => handleDeleteFacility(id)}
						disabled={isPendingDeleteFacility}
					>
						{isPendingDeleteFacility ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						) : (
							"Delete Facility"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteFacilityModal;
