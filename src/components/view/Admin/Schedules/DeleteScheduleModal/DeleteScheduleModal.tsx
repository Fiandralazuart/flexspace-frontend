import { useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

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

import useDeleteScheduleModal from "./useDeleteScheduleModal";

interface PropsTypes {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchSchedule: () => void;
	name: string;
	id: string;
}

const DeleteScheduleModal = ({
	open,
	onOpenChange,
	refetchSchedule,
	name,
	id,
}: PropsTypes) => {
	const {
		handleDeleteSchedule,
		isPendingDeleteSchedule,
		isSuccessDeleteSchedule,
	} = useDeleteScheduleModal();

	useEffect(() => {
		if (isSuccessDeleteSchedule) {
			refetchSchedule();
			onOpenChange(false);
		}
	}, [
		isSuccessDeleteSchedule,
		refetchSchedule,
		onOpenChange,
	]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="font-bold text-red-600">
						Delete Schedule
					</DialogTitle>

					<DialogDescription>
						This action will permanently delete the selected
						schedule.
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
								schedule will be permanently removed from
								FlexSpace.
							</p>

							<div className="rounded-md border bg-white px-3 py-2">
								<p className="text-xs text-muted-foreground">
									Schedule
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
						disabled={isPendingDeleteSchedule}
					>
						Cancel
					</Button>

					<Button
						type="button"
						variant="destructive"
						onClick={() => handleDeleteSchedule(id)}
						disabled={isPendingDeleteSchedule}
					>
						{isPendingDeleteSchedule ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						) : (
							"Delete Schedule"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteScheduleModal;