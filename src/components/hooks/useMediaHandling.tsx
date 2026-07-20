import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useMediaHandling = () => {
	const uploadFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		const {
			data: { data },
		} = await uploadServices.uploadFile(formData);

		return data;
	};

	const { mutateAsync: mutateUploadFile, isPending: isPendingUploadFile } =
		useMutation({
			mutationFn: uploadFile,
			onError: () => {
				toast.error("Failed to upload file");
			},
		});

	const handleUploadFile = async (files: FileList) => {
		if (files.length === 0) return;

		return await mutateUploadFile(files[0]);
	};

	const deleteFile = async (fileUrl: string) => {
		return await uploadServices.deleteFile({ fileUrl });
	};

	const { mutateAsync: mutateDeleteFile, isPending: isPendingDeleteFile } =
		useMutation({
			mutationFn: deleteFile,
			onError: (error) => {
				toast.error(error.message);
			},
		});

	const handleDeleteFile = async (fileUrl: string) => {
		await mutateDeleteFile(fileUrl);
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
