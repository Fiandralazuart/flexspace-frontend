"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

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
import { IBuilding } from "@/types/space";

type Props = {
	value?: string;
	onChange: (value: string) => void;

	data: IBuilding[];
	isLoading: boolean;

	search: string;
	onSearch: (value: string) => void;
};

const BuildingCombobox = ({
	value,
	onChange,
	data,
	isLoading,
	search,
	onSearch,
}: Props) => {
	const [open, setOpen] = React.useState(false);

	const selectedBuilding = data.find((building) => building.id === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger className="w-full">
				<div className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 text-sm">
					<span>{selectedBuilding?.name ?? "Select Building"}</span>

					<ChevronsUpDown className="h-4 w-4 opacity-50" />
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-[400px] p-0">
				<Command shouldFilter={false}>
					<CommandInput
						placeholder="Search building..."
						value={search}
						onValueChange={onSearch}
					/>

					<CommandList>
						{isLoading ? (
							<div className="flex items-center justify-center py-6">
								<Loader2 className="h-5 w-5 animate-spin" />
							</div>
						) : (
							<>
								<CommandEmpty>Building not found.</CommandEmpty>

								<CommandGroup>
									{data.map((building) => (
										<CommandItem
											key={building.id}
											value={building.id}
											onSelect={() => {
												onChange(building.id);
												setOpen(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													value === building.id
														? "opacity-100"
														: "opacity-0",
												)}
											/>

											{building.name}
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
};

export default BuildingCombobox;
