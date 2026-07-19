"use client";

import { Building2, MoreHorizontal, Plus, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import useDebounce from "@/components/hooks/useDebounce";
import useQueryParams from "@/components/hooks/useQueryParams";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useSpace from "./useSpaces";

const SpacesView = () => {
	const { dataSpace, meta, isLoadingGetSpace } = useSpace();
	const { search, limit, updateQuery } = useQueryParams();

	const debounce = useDebounce();

	const currentPage = meta?.page ?? 1;
	const totalPage = meta?.totalPage ?? 1;

	const pages = (() => {
		const result: (number | "...")[] = [];

		if (totalPage <= 7) {
			return Array.from({ length: totalPage }, (_, i) => i + 1);
		}

		result.push(1);

		if (currentPage > 3) {
			result.push("...");
		}

		const start = Math.max(2, currentPage - 1);
		const end = Math.min(totalPage - 1, currentPage + 1);

		for (let i = start; i <= end; i++) {
			result.push(i);
		}

		if (currentPage < totalPage - 2) {
			result.push("...");
		}

		result.push(totalPage);

		return result;
	})();

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Building List</CardTitle>

					<p className="mt-1 text-sm text-muted-foreground">
						Manage all buildings across your organization.
					</p>
				</div>

				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add Building
				</Button>
			</CardHeader>

			<CardContent>
				<div className="relative mb-6 max-w-sm">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

					<Input
						className="pl-10"
						defaultValue={search}
						placeholder="Search building..."
						onChange={(e) =>
							debounce(() => {
								updateQuery({
									search: e.target.value,
									page: 1,
								});
							}, 500)
						}
					/>
				</div>

				<div className="rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Space</TableHead>

								<TableHead className="text-center">
									Building
								</TableHead>

								<TableHead className="text-center">
									Floor
								</TableHead>

								<TableHead>
									<div className="text-center">Capacity</div>
								</TableHead>

								<TableHead>Occupancy</TableHead>

								<TableHead className="text-center">
									Status
								</TableHead>

								<TableHead className="w-[70px] text-center" />
							</TableRow>
						</TableHeader>

						<TableBody>
							{!isLoadingGetSpace &&
								dataSpace.map((space: any) => {
									const percentage =
										space.capacity > 0
											? Math.round(
													(space.personCount /
														space.capacity) *
														100,
												)
											: 0;

									const progressWidth = Math.min(
										percentage,
										100,
									);

									const occupancyBadge =
										space.personCount > space.capacity
											? {
													label: "OVER CAPACITY",
													className:
														"border-red-200 bg-red-50 text-red-700",
												}
											: space.occupancyStatus === "EMPTY"
												? {
														label: "EMPTY",
														className:
															"border-slate-200 bg-slate-50 text-slate-700",
													}
												: {
														label: "OCCUPIED",
														className:
															"border-amber-200 bg-amber-50 text-amber-700",
													};

									return (
										<TableRow key={space.id}>
											<TableCell>
												<div>
													<p className="font-medium">
														{space.name}
													</p>

													<p className="line-clamp-1 text-xs text-muted-foreground">
														{space.description}
													</p>
												</div>
											</TableCell>

											<TableCell className="text-center">
												{space.building.name}
											</TableCell>

											<TableCell className="text-center">
												{space.floor}
											</TableCell>

											<TableCell className="text-center">
												{space.capacity}
											</TableCell>

											<TableCell className="min-w-[240px]">
												<div className="space-y-2">
													<div className="flex items-center justify-between text-xs">
														<span className="font-medium">
															{space.personCount}{" "}
															/ {space.capacity}{" "}
															people
														</span>

														<span
															className={`font-semibold ${
																percentage > 100
																	? "text-red-600"
																	: ""
															}`}
														>
															{percentage}%
														</span>
													</div>

													<div className="h-2 overflow-hidden rounded-full bg-muted">
														<div
															className={`h-full rounded-full transition-all ${
																percentage > 100
																	? "bg-red-500"
																	: percentage >
																		  80
																		? "bg-amber-500"
																		: "bg-emerald-500"
															}`}
															style={{
																width: `${progressWidth}%`,
															}}
														/>
													</div>

													<Badge
														variant="outline"
														className={
															occupancyBadge.className
														}
													>
														{occupancyBadge.label}
													</Badge>
												</div>
											</TableCell>

											<TableCell className="text-center">
												<Badge
													className={
														space.status ===
														"AVAILABLE"
															? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
															: "bg-orange-100 text-orange-700 hover:bg-orange-100"
													}
												>
													{space.status}
												</Badge>
											</TableCell>

											<TableCell className="text-center">
												<DropdownMenu>
													<DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
														<MoreHorizontal className="h-4 w-4" />
													</DropdownMenuTrigger>

													<DropdownMenuContent align="end">
														<DropdownMenuItem>
															Edit
														</DropdownMenuItem>

														<DropdownMenuItem className="text-red-600">
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>

				<div className="mt-6 flex items-center justify-between border-t pt-4">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								Rows per page
							</span>

							<Select
								value={String(limit)}
								onValueChange={(value) =>
									updateQuery({
										limit: Number(value),
										page: 1,
									})
								}
							>
								<SelectTrigger className="h-9 w-20">
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="10">10</SelectItem>
									<SelectItem value="25">25</SelectItem>
									<SelectItem value="50">50</SelectItem>
									<SelectItem value="100">100</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<p className="text-sm text-muted-foreground">
							Showing{" "}
							<span className="font-medium">
								{dataSpace.length}
							</span>{" "}
							of{" "}
							<span className="font-medium">
								{meta?.totalData ?? 0}
							</span>{" "}
							buildings
						</p>
					</div>

					<Pagination className="ml-auto">
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									className={
										currentPage === 1
											? "pointer-events-none opacity-50"
											: "cursor-pointer"
									}
									onClick={() =>
										currentPage > 1 &&
										updateQuery({
											page: currentPage - 1,
										})
									}
								/>
							</PaginationItem>

							{pages.map((item, index) => (
								<PaginationItem key={`${item}-${index}`}>
									{item === "..." ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											isActive={item === currentPage}
											className="cursor-pointer"
											onClick={() =>
												updateQuery({
													page: item,
												})
											}
										>
											{item}
										</PaginationLink>
									)}
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									className={
										currentPage === totalPage
											? "pointer-events-none opacity-50"
											: "cursor-pointer"
									}
									onClick={() =>
										currentPage < totalPage &&
										updateQuery({
											page: currentPage + 1,
										})
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</CardContent>
		</Card>
	);
};

export default SpacesView;
