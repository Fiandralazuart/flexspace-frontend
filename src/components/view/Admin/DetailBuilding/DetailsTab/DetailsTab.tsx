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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import useDetailsTab from "./useDetailsTab";
import CityCombobox from "@/components/common/cityCombox";
import { IBuilding } from "@/types/space";
import { UpdateBuildingDTO } from "../useDetailBuilding";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

type PropTypes = {
	dataBuilding: IBuilding;
	handleUpdateBuilding: (payload: UpdateBuildingDTO) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;

	control: Control<UpdateBuildingDTO>;
	errors: FieldErrors<UpdateBuildingDTO>;
	handleSubmit: UseFormHandleSubmit<UpdateBuildingDTO>;
};
const DetailsTab = (props: PropTypes) => {
	const {
		dataBuilding,
		control,
		errors,
		handleSubmit,
		handleUpdateBuilding,
	} = props;

	const { dataCity, isLoadingCity, searchCity, setSearchCity, onSubmit } =
		useDetailsTab();
	const router = useRouter();

	return (
		<form onSubmit={handleSubmit(handleUpdateBuilding)}>
			<div className="max-w-2xl py-10">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">
							Details Information
						</CardTitle>

						<CardDescription className="text-base">
							Manage your detail information about this building.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-8">
						{/* Information */}
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
											placeholder="Building name"
										/>
									)}
								/>

								{errors.name && (
									<p className="text-sm text-destructive">
										{errors.name.message}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Location</h3>

							<div className="space-y-2">
								<Label>Address</Label>

								<Controller
									name="location.address"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="Building address"
										/>
									)}
								/>

								{errors.location?.address && (
									<p className="text-sm text-destructive">
										{errors.location.address.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>Region Id</Label>

								<Controller
									name="location.region"
									control={control}
									render={({ field }) => (
										<CityCombobox
											value={field.value}
											onChange={field.onChange}
											data={dataCity}
											isLoading={isLoadingCity}
											search={searchCity}
											onSearch={setSearchCity}
										/>
									)}
								/>

								{errors.location?.region && (
									<p className="text-sm text-destructive">
										{errors.location.region.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label>Google Maps Link</Label>

								<Controller
									name="location.link"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											placeholder="https://maps.google.com/..."
										/>
									)}
								/>

								{errors.location?.link && (
									<p className="text-sm text-destructive">
										{errors.location.link.message}
									</p>
								)}
							</div>
						</div>
					</CardContent>

					<CardFooter className="justify-end gap-2">
						<Button
							onClick={() => router.push(`/admin/buildings`)}
							type="button"
							variant="outline"
						>
							Back
						</Button>

						<Button type="submit">Save Changes</Button>
					</CardFooter>
				</Card>
			</div>
		</form>
	);
};

export default DetailsTab;
