"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { City } from "../view/Admin/Buildings/addBuildingModal/useAddBuildingModal";

interface Props {
	value?: number;
	onChange: (value: number) => void;

	data: City[];
	defaultCity?: City;

	isLoading: boolean;

	search: string;
	onSearch: (value: string) => void;
}

export default function CityCombobox({
	value,
	onChange,
	data,
	defaultCity,
	isLoading,
	search,
	onSearch,
}: Props) {
	const [open, setOpen] = React.useState(false);

	const selectedCity =
		data.find((city) => Number(city.id) === value) ?? defaultCity;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						role="combobox"
						className="w-full justify-between"
					/>
				}
			>
				{selectedCity ? (
					<div className="flex flex-col items-start">
						<span>{selectedCity.name}</span>

						<span className="text-xs text-muted-foreground">
							{selectedCity.province?.name ?? "-"}
						</span>
					</div>
				) : value ? (
					<span>{value}</span>
				) : (
					<span className="text-muted-foreground">Select city</span>
				)}

				<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</PopoverTrigger>

			<PopoverContent className="w-[400px] p-0">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder="Search city..."
						value={search}
						onValueChange={onSearch}
					/>

					<CommandList>
						{isLoading ? (
							<div className="p-4 text-sm text-muted-foreground">
								Loading...
							</div>
						) : (
							<>
								<CommandEmpty>No city found.</CommandEmpty>

								<CommandGroup>
									{data.map((city) => (
										<CommandItem
											key={city.id}
											value={String(city.id)}
											onSelect={() => {
												onChange(Number(city.id));
												setOpen(false);
											}}
										>
											<div className="flex flex-col">
												<span>{city.name}</span>

												<span className="text-xs text-muted-foreground">
													{city.province?.name ?? "-"}
												</span>
											</div>

											<Check
												className={cn(
													"ml-auto h-4 w-4",
													Number(city.id) === value
														? "opacity-100"
														: "opacity-0",
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
