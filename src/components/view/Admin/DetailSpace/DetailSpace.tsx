"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useDetailSpace from "./useDetailSpace";
import ImageTab from "./ImageTab";
import DetailsTab from "./DetailsTab";
import DeviceTab from "./DeviceTab";

const DetailSpace = () => {
	const {
		dataSpace,
		isLoadingSpace,

		handleUpdateSpace,
		refetchSpace,
		isPendingUpdateSpace,
		isSuccessUpdateSpace,

		control,
		errors,
		handleSubmit,
		setValue,
		watch,
	} = useDetailSpace();

	if (isLoadingSpace || !dataSpace) {
		return <div>Loading...</div>;
	}

	const space = dataSpace.data.data;

	return (
		<Tabs defaultValue="information">
			<TabsList className="h-12">
				<TabsTrigger value="information" className="px-6 text-base">
					Information
				</TabsTrigger>

				<TabsTrigger value="image" className="px-6 text-base">
					Image
				</TabsTrigger>
				<TabsTrigger value="device" className="px-6 text-base">
					Device
				</TabsTrigger>
			</TabsList>

			<TabsContent value="image">
				<ImageTab
					dataSpace={space}
					control={control}
					errors={errors}
					handleSubmit={handleSubmit}
					handleUpdateSpace={handleUpdateSpace}
					isPendingUpdate={isPendingUpdateSpace}
					setValue={setValue}
					watch={watch}
				/>
			</TabsContent>

			<TabsContent value="information">
				<DetailsTab
					dataSpace={space}
					control={control}
					errors={errors}
					handleSubmit={handleSubmit}
					handleUpdateSpace={handleUpdateSpace}
					isPendingUpdate={isPendingUpdateSpace}
					isSuccessUpdate={isSuccessUpdateSpace}
				/>
			</TabsContent>
			<TabsContent value="device">
				<DeviceTab
					dataSpace={space}
					refetchSpace={refetchSpace}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default DetailSpace;
