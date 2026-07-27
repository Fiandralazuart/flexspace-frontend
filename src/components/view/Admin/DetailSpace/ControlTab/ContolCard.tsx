import { AirVent, Lightbulb, Minus, Plus, Thermometer } from "lucide-react";

import { FacilityStatus, FacilityType, IFacility } from "@/types/facility";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Props {
	facility: IFacility;
}
import { useEffect, useState } from "react";
import useControl from "./useControlTab";

const DEFAULT_AC_TEMPERATURE = 24;

const config = {
	[FacilityType.AIR_CONDITIONER]: {
		icon: AirVent,
		label: "Air Conditioner",
		iconClass: "bg-blue-100 text-blue-600",
	},
	[FacilityType.LIGHT]: {
		icon: Lightbulb,
		label: "Lighting",
		iconClass: "bg-amber-100 text-amber-600",
	},
};

const ControlCard = ({ facility }: Props) => {
	const item = config[facility.type];
	const Icon = item.icon;

	
	const temperature = facility.value ?? DEFAULT_AC_TEMPERATURE;
	const isOn = facility.status === FacilityStatus.ON;
	const [checked, setChecked] = useState(isOn);

	const { handleToggle, isPendingControlFacility } = useControl();

	useEffect(() => {
		setChecked(isOn);
	}, [isOn]);

	return (
		<Card className="overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
			<CardHeader className="border-b px-4 py-3">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className={`rounded-lg p-2.5 ${item.iconClass}`}>
							<Icon className="h-5 w-5" />
						</div>

						<div>
							<h3 className="text-sm font-semibold">
								{facility.name}
							</h3>

							<p className="text-[11px] text-muted-foreground">
								{item.label}
							</p>
						</div>
					</div>

					<div className="flex flex-col items-end gap-2">
						<Badge
							className="text-[10px]"
							variant={isOn ? "default" : "secondary"}
						>
							{facility.status}
						</Badge>

						<Switch
							checked={checked}
							disabled={isPendingControlFacility}
							onCheckedChange={(value) => {
								setChecked(value);

								handleToggle(facility.id, {
									status: value
										? FacilityStatus.ON
										: FacilityStatus.OFF,

									...(facility.type ===
										FacilityType.AIR_CONDITIONER && {
										value: temperature,
									}),
								});
							}}
						/>
					</div>
				</div>
			</CardHeader>

			<CardContent className="flex min-h-[120px] items-center justify-center px-4 py-5">
				{facility.type === FacilityType.AIR_CONDITIONER ? (
					<div className="w-full space-y-4">
						<div className="text-center">
							<p className="text-[11px] uppercase tracking-wider text-muted-foreground">
								Temperature
							</p>

							<div className="mt-2 flex items-center justify-center gap-2">
								<Thermometer className="h-5 w-5 text-blue-500" />

								<span className="text-4xl font-bold">
									{temperature}°
								</span>
							</div>
						</div>

						<div className="flex justify-center gap-5">
							<Button
								size="icon"
								variant="outline"
								className="h-10 w-10 rounded-full"
							>
								<Minus className="h-4 w-4" />
							</Button>

							<Button
								size="icon"
								variant="outline"
								className="h-10 w-10 rounded-full"
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center gap-3">
						<div
							className={`rounded-full p-4 transition-colors ${
								checked ? "bg-green-100" : "bg-yellow-100"
							}`}
						>
							<Lightbulb
								className={`h-10 w-10 transition-colors ${
									checked
										? "fill-green-500 text-green-600"
										: "fill-yellow-400 text-yellow-500"
								}`}
							/>
						</div>

						<div className="text-center">
							<p className="text-sm font-medium">Room Lighting</p>

							<p className="text-[11px] text-muted-foreground">
								Control lighting with the switch
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default ControlCard;
