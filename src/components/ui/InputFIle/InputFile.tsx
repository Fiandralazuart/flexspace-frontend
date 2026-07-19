
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropTypes {
	name: string;
	label?: ReactNode;
	classname?: string;
	isDropable?: boolean;
	isUploading?: boolean;
	isDeleting?: boolean;
	isInvalid?: boolean;
	onUpload?: (files: FileList) => void;
	onDelete?: () => void;
	preview?: string;
	errorMessage?: string;
}

const InputFile = ({
	name,
	label,
	classname,
	isDropable = false,
	isUploading = false,
	isDeleting = false,
	isInvalid = false,
	onUpload,
	onDelete,
	preview,
	errorMessage,
}: PropTypes) => {
	const drop = useRef<HTMLLabelElement>(null);
	const dropzoneId = useId();

	const handleDragOver = (e: DragEvent) => {
		if (!isDropable) return;

		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();

		const files = e.dataTransfer?.files;

		if (files && onUpload) {
			onUpload(files);
		}
	};

	useEffect(() => {
		const current = drop.current;

		if (!current) return;

		current.addEventListener("dragover", handleDragOver);
		current.addEventListener("drop", handleDrop);

		return () => {
			current.removeEventListener("dragover", handleDragOver);
			current.removeEventListener("drop", handleDrop);
		};
	}, []);

	const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files;

		if (files && onUpload) {
			onUpload(files);
		}
	};

	return (
		<div className="space-y-2">
			{label}

			<label
				ref={drop}
				htmlFor={`dropzone-file-${dropzoneId}`}
				className={cn(
					"flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 transition-colors hover:bg-muted/40",
					isInvalid && "border-destructive",
					classname
				)}
			>
				{preview ? (
					<div className="relative flex w-full flex-col items-center justify-center p-5">
						<div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border">
							<Image
								src={preview}
								alt="Preview"
								fill
								className="object-cover"
							/>
						</div>

						<Button
							type="button"
							size="icon"
							variant="destructive"
							className="absolute right-4 top-4"
							onClick={onDelete}
							disabled={isDeleting}
						>
							{isDeleting ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<Trash2 className="h-4 w-4" />
							)}
						</Button>
					</div>
				) : isUploading ? (
					<div className="flex flex-col items-center justify-center gap-2 py-8">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						<p className="text-sm text-muted-foreground">
							Uploading...
						</p>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center gap-3 py-8">
						<Upload className="h-10 w-10 text-muted-foreground" />

						<div className="text-center">
							<p className="font-medium">
								{isDropable
									? "Drag & drop or click to upload"
									: "Click to upload"}
							</p>

							<p className="text-sm text-muted-foreground">
								PNG, JPG, JPEG up to 10MB
							</p>
						</div>
					</div>
				)}

				<input
					id={`dropzone-file-${dropzoneId}`}
					name={name}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleOnUpload}
					disabled={!!preview}
					onClick={(e) => {
						e.currentTarget.value = "";
					}}
				/>
			</label>

			{isInvalid && errorMessage && (
				<p className="text-sm text-destructive">{errorMessage}</p>
			)}
		</div>
	);
};

export default InputFile;