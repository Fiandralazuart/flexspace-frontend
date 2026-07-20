"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDetailBuilding from "./useDetailBuilding";
import DetailsTab from "./DetailsTab";

const DetailBuilding = () => {
	const {
		dataBuilding,
		isLoadingBuilding,
		handleUpdateBuilding,
		isPendingUpdateBuilding,
		isSuccessUpdateBuilding,
		control,
		errors,
		handleSubmit,
	} = useDetailBuilding();

	if (isLoadingBuilding || !dataBuilding) {
		return <div>Loading...</div>;
	}

	const building = dataBuilding.data.data;

	return (
		<Tabs defaultValue="image">
			<TabsList className="h-12">
				<TabsTrigger value="information" className="px-6 text-base">
					Information
				</TabsTrigger>
			</TabsList>

			<TabsContent value="information">
				<DetailsTab
					dataBuilding={building}
					control={control}
					errors={errors}
					handleSubmit={handleSubmit}
					handleUpdateBuilding={handleUpdateBuilding}
					isPendingUpdate={isPendingUpdateBuilding}
					isSuccessUpdate={isSuccessUpdateBuilding}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default DetailBuilding;
