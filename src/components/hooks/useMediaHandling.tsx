
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useMediaHandling = () => {
	const uploadFile = async (
		file: File,
		callback: (fileUrl: string) => void
	) => {
		const formData = new FormData();
		formData.append("file", file);

		const {
			data: {
				data: { secure_url: fileUrl },
			},
		} = await uploadServices.uploadFile(formData);

		console.log(fileUrl);
		callback(fileUrl);
	};

	const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
		useMutation({
			mutationFn: (variable: {
				file: File;
				callback: (fileUrl: string) => void;
			}) => uploadFile(variable.file, variable.callback),
			onError: () => {
				toast.error("Failed to upload file");
			},
		});

	const handleUploadFile = (
		files: FileList,
		onChange: (files: FileList | undefined) => void,
		callback: (fileUrl?: string) => void
	) => {
		if (files.length !== 0) {
			onChange(files);
			mutateUploadFile({
				file: files[0],
				callback,
			});
		}
	};

	const deleteFile = async (fileUrl: string, callback: () => void) => {
		const result = await uploadServices.deleteFile({ fileUrl });

		if (result.data.meta.status === 200) {
			callback();
		}
	};

	const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile } =
		useMutation({
			mutationFn: (variable: {
				fileUrl: string;
				callback: () => void;
			}) => deleteFile(variable.fileUrl, variable.callback),
			onError: (error) => {
				toast.error(error.message);
			},
		});

	const handleDeleteFile = (
		fileUrl: string | FileList | undefined,
		callback: () => void
	) => {
		if (typeof fileUrl === "string") {
			mutateDeleteFile({ fileUrl, callback });
		} else {
			callback();
		}
	};

	return {
		mutateUploadFile,
		isPendingUploadFile,
		handleUploadFile,

		mutateDeleteFile,
		isPendingDeleteFile,
		handleDeleteFile,
	};
};

export default useMediaHandling;