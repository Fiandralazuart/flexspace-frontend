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

import useDeleteSpaceModal from "./useDeleteSpaceModal";

interface PropsTypes {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	refetchSpace: () => void;
	name: string;
	id: string;
}

const DeleteSpaceModal = ({
	open,
	onOpenChange,
	refetchSpace,
	name,
	id,
}: PropsTypes) => {
	const {
		handleDeleteSpace,
		isPendingDeleteSpace,
		isSuccessDeleteSpace,
	} = useDeleteSpaceModal();

	useEffect(() => {
		if (isSuccessDeleteSpace) {
			refetchSpace();
			onOpenChange(false);
		}
	}, [isSuccessDeleteSpace, refetchSpace, onOpenChange]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="font-bold text-red-600">
						Delete Space
					</DialogTitle>

					<DialogDescription>
						This action will permanently delete the selected
						space.
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
								space will be permanently removed from
								FlexSpace.
							</p>

							<div className="rounded-md border bg-white px-3 py-2">
								<p className="text-xs text-muted-foreground">
									Space
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
						disabled={isPendingDeleteSpace}
					>
						Cancel
					</Button>

					<Button
						type="button"
						variant="destructive"
						onClick={() => handleDeleteSpace(id)}
						disabled={isPendingDeleteSpace}
					>
						{isPendingDeleteSpace ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						) : (
							"Delete Space"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteSpaceModal;