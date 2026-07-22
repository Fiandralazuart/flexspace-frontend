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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDetailFacility from "./useDetailsFacility";
import { FacilityType } from "@/types/facility";

const DetailFacility = () => {
	const facilityTypeLabel: Record<FacilityType, string> = {
		[FacilityType.LIGHT]: "Light",
		[FacilityType.AIR_CONDITIONER]: "Air Conditioner",
	};
	const {
		dataFacility,
		isLoadingFacility,

		control,
		errors,
		handleSubmit,

		handleUpdateFacility,
		isPendingUpdateFacility,
	} = useDetailFacility();

	const router = useRouter();

	if (isLoadingFacility || !dataFacility) {
		return <div>Loading...</div>;
	}

	const facility = dataFacility.data.data;

	return (
		<form onSubmit={handleSubmit(handleUpdateFacility)}>
			<div className="max-w-2xl py-10">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">
							Details Information
						</CardTitle>

						<CardDescription className="text-base">
							Manage your detail information about this facility.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-8">
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">
								Information
							</h3>

							<div className="space-y-2">
								<Label>Name</Label>

								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Facility name"
										/>
									)}
								/>

								{errors.name && (
									<p className="text-sm text-destructive">
										{errors.name.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>Type</Label>

								<Input
									value={
										facilityTypeLabel[
											facility.type as FacilityType
										]
									}
									readOnly
									disabled
								/>
							</div>

							<div className="space-y-2">
								<Label>Channel</Label>

								<Controller
									name="channel"
									control={control}
									render={({ field }) => (
										<Input
											type="number"
											value={field.value}
											onChange={(e) =>
												field.onChange(
													Number(e.target.value),
												)
											}
										/>
									)}
								/>

								{errors.channel && (
									<p className="text-sm text-destructive">
										{errors.channel.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>Status</Label>

								<Input
									value={facility.status}
									readOnly
									disabled
								/>
							</div>

							<div className="space-y-2">
								<Label>Device</Label>

								<Input
									value={facility.device?.name ?? "-"}
									readOnly
									disabled
								/>
							</div>
						</div>
					</CardContent>

					<CardFooter className="justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => router.back()}
						>
							Back
						</Button>

						<Button
							type="submit"
							disabled={isPendingUpdateFacility}
						>
							Save Changes
						</Button>
					</CardFooter>
				</Card>
			</div>
		</form>
	);
};

export default DetailFacility;
