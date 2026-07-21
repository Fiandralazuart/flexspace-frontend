"use client";

import { ReactNode, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Lightbulb, Snowflake, MoreHorizontal } from "lucide-react";

import { COLUMN_FACILITY } from "./facility.constant";
import useFacilityTab from "./useFacilityTab";
import { IFacility } from "@/types/facility";

export enum FacilityType {
	LIGHT = "LIGHT",
	AIR_CONDITIONER = "AIR_CONDITIONER",
}

export enum FacilityStatus {
	ON = "ON",
	OFF = "OFF",
}
interface PropsTypes {
	deviceId: string;
}

const FacilityTab = ({ deviceId }: PropsTypes) => {
	const { dataFacility, isLoadingFacility, refetchFacility } = useFacilityTab(
		{ deviceId },
	);

	const renderCell = useCallback(
		(
			facility: IFacility,
			columnKey: keyof IFacility | "actions",
		): ReactNode => {
			switch (columnKey) {
				case "name":
					return (
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								{facility.type === FacilityType.LIGHT ? (
									<Lightbulb className="h-4 w-4 text-yellow-500" />
								) : (
									<Snowflake className="h-4 w-4 text-sky-500" />
								)}
							</div>

							<p className="font-medium">{facility.name}</p>
						</div>
					);

				case "type":
					return facility.type === FacilityType.LIGHT
						? "Light"
						: "Air Conditioner";

				case "channel":
					return facility.channel;

				case "status":
					return (
						<Badge
							variant={
								facility.status === FacilityStatus.ON
									? "default"
									: "secondary"
							}
							className={
								facility.status === FacilityStatus.ON
									? "bg-emerald-500 hover:bg-emerald-600"
									: "bg-red-200 text-red-700 hover:bg-red-300"
							}
						>
							{facility.status}
						</Badge>
					);

				case "actions":
					return (
						<DropdownMenu>
							<DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent">
								<MoreHorizontal className="h-4 w-4" />
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end">
								<DropdownMenuItem>Edit</DropdownMenuItem>

								<DropdownMenuItem className="text-red-500">
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					);

				default:
					return null;
			}
		},
		[],
	);

	return (
		<DataTable<IFacility>
			title="Facility List"
			description="Manage smart facilities connected to this device."
			data={dataFacility}
			columns={COLUMN_FACILITY}
			renderCell={renderCell}
			loading={isLoadingFacility}
			addLabel="Add Facility"
			onAdd={() => {}}
		/>
	);
};

export default FacilityTab;
