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
import useDeleteBuildingModal from "./useDeleteBuildingModal";
import { useEffect } from "react";

interface PropsTypes {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchBuilding: () => void;
	name: string;
	id: string;
}

const DeleteBuildingModal = ({
	open,
	onOpenChange,
	refetchBuilding,
	name,
	id,
}: PropsTypes) => {
	const {
		handleDeleteBuilding,
		isPendingDeleteBuilding,
		isSuccessDeleteBuilding,
	} = useDeleteBuildingModal();

	useEffect(() => {
		if (isSuccessDeleteBuilding) {
			refetchBuilding();
			onOpenChange(false);
		}
	}, [isSuccessDeleteBuilding, refetchBuilding, onOpenChange]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-red-600 font-bold">
						Delete Building
					</DialogTitle>

					<DialogDescription>
						This action will permanently delete the selected
						building.
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
								building will be permanently removed from
								FlexSpace.
							</p>

							<div className="rounded-md border bg-white px-3 py-2">
								<p className="text-xs text-muted-foreground">
									Building
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
						disabled={isPendingDeleteBuilding}
					>
						Cancel
					</Button>

					<Button
						type="button"
						variant="destructive"
						onClick={() => handleDeleteBuilding(id)}
						disabled={isPendingDeleteBuilding}
					>
						{isPendingDeleteBuilding ? (
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

export default DeleteBuildingModal;
