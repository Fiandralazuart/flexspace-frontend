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
import { AlertTriangle, Loader2 } from "lucide-react";
import useDeleteBuildingModal from "./useDeleteDeviceModal";
import { useEffect } from "react";
import useDeleteDeviceModal from "./useDeleteDeviceModal";

interface PropsTypes {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchSpace: () => void;
	name: string;
	id: string;
}

const DeleteDeviceModal = ({
	open,
	onOpenChange,
	refetchSpace,
	name,
	id,
}: PropsTypes) => {
	const {
		handleDeleteDevice,
		isPendingDeleteDevice,
		isSuccessDeleteDevice,
	} = useDeleteDeviceModal();

	useEffect(() => {
		if (isSuccessDeleteDevice) {
			refetchSpace();
			onOpenChange(false);
		}
	}, [isSuccessDeleteDevice, refetchSpace, onOpenChange]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-red-600 font-bold">
						Delete Device
					</DialogTitle>

					<DialogDescription>
						This action will permanently delete this
						Device.
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
								This action cannot be undone. The following
								Device will be permanently removed from
								Space.
							</p>

							<div className="rounded-md border bg-white px-3 py-2">
								<p className="text-xs text-muted-foreground">
									Device
								</p>

								<p className="">{name}</p>
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
						disabled={isPendingDeleteDevice}
					>
						Cancel
					</Button>

					<Button
						type="button"
						variant="destructive"
						onClick={() => handleDeleteDevice(id)}
						disabled={isPendingDeleteDevice}
					>
						{isPendingDeleteDevice ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						) : (
							"Delete Building"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteDeviceModal;
