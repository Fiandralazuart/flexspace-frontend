"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useDetailSchedule from "./useDetailSchedule";
import DetailsTab from "./DetailsTab";

const DetailSchedule = () => {
	const {
		control,
		errors,
		handleSubmit,

		dataSchedule,
		isLoadingSchedule,
		isRefetchingSchedule,

		dataSpace,
		isLoadingSpace,

		handleUpdateSchedule,
		isPendingUpdateSchedule,
		isSuccessUpdateSchedule,
	} = useDetailSchedule();

	if (isLoadingSchedule || isLoadingSpace || !dataSchedule || !dataSpace) {
		return <div>Loading...</div>;
	}

	const schedule = dataSchedule.data.data;
	const spaces = dataSpace.data;

	console.log(schedule);
	return (
		<Tabs defaultValue="information">
			<TabsList className="h-12">
				<TabsTrigger value="information" className="px-6 text-base">
					Information
				</TabsTrigger>
			</TabsList>

			<TabsContent value="information">
				<DetailsTab
					dataSchedule={schedule}
					control={control}
					errors={errors}
					handleSubmit={handleSubmit}
					handleUpdateSchedule={handleUpdateSchedule}
					isPendingUpdate={isPendingUpdateSchedule}
					isSuccessUpdate={isSuccessUpdateSchedule}
					dataSpace={spaces}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default DetailSchedule;
