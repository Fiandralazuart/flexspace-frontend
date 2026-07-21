import useMediaHandling from "@/components/hooks/useMediaHandling";

const useImageTab = () => {
	const {
		handleUploadFile,
		handleDeleteFile,
		isPendingUploadFile,
		isPendingDeleteFile,
	} = useMediaHandling();

	return {
		handleUploadFile,
		handleDeleteFile,

		isPendingUploadFile,
		isPendingDeleteFile,
	};
};

export default useImageTab;