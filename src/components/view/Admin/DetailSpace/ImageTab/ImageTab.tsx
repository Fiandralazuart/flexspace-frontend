"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Controller, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { useRouter } from "next/navigation";

import InputFile from "@/components/ui/InputFIle";

import { UpdateSpaceDTO } from "../useDetailSpace";
import { ISpace } from "@/types/space";
import useImageTab from "./useImageTab";

type Props = {
	dataSpace: ISpace;

	handleUpdateSpace: (payload: UpdateSpaceDTO) => void;

	isPendingUpdate: boolean;

	control: Control<UpdateSpaceDTO>;
	errors: FieldErrors<UpdateSpaceDTO>;
	handleSubmit: UseFormHandleSubmit<UpdateSpaceDTO>;

	setValue: UseFormSetValue<UpdateSpaceDTO>;
	watch: UseFormWatch<UpdateSpaceDTO>;
};

const ImageTab = ({
	dataSpace,
	control,
	errors,
	handleSubmit,
	handleUpdateSpace,
	isPendingUpdate,
	setValue,
	watch,
}: Props) => {
	const router = useRouter();

	const {
		handleUploadFile,
		handleDeleteFile,
		isPendingUploadFile,
		isPendingDeleteFile,
	} = useImageTab();

	return (
		<form onSubmit={handleSubmit(handleUpdateSpace)}>
			<div className="max-w-2xl py-10">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Space Image</CardTitle>

						<CardDescription>
							Manage the image of this space.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="space-y-2">
							<Label>Picture</Label>

							<Controller
								name="picture"
								control={control}
								render={({ field }) => (
									<InputFile
										name="picture"
										preview={field.value}
										isUploading={isPendingUploadFile}
										isDeleting={isPendingDeleteFile}
										isInvalid={!!errors.picture}
										errorMessage={errors.picture?.message}
										onUpload={async (files: FileList) => {
											const result =
												await handleUploadFile(files);

											if (!result) return;

											field.onChange(result.secure_url);

											// kalau memakai pictureId
											setValue(
												"pictureId",
												result.public_id,
											);
										}}
										onDelete={async () => {
											if (!watch("picture")) return;

											await handleDeleteFile(
												watch("picture"),
											);

											field.onChange("");

											// kalau memakai pictureId
											setValue("pictureId", "");
										}}
									/>
								)}
							/>

							{errors.picture && (
								<p className="text-sm text-destructive">
									{errors.picture.message}
								</p>
							)}
						</div>
					</CardContent>

					<CardFooter className="justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.push("/admin/spaces")}
						>
							Back
						</Button>

						<Button type="submit" disabled={isPendingUpdate}>
							Save Changes
						</Button>
					</CardFooter>
				</Card>
			</div>
		</form>
	);
};

export default ImageTab;
