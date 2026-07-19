"use client";

import useBuilding from "./useBuilding";

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

const Building = () => {
	const { dataBuilding, meta, isLoadingGetBuilding } = useBuilding();
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
								<TableHead>Building</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Created At</TableHead>
								<TableHead className="w-[70px]" />
							</TableRow>
						</TableHeader>

						<TableBody>
							{!isLoadingGetBuilding &&
								dataBuilding.map((building: any) => (
									<TableRow key={building.id}>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="rounded-lg bg-primary/10 p-2">
													<Building2 className="h-4 w-4 text-primary" />
												</div>

												<div>
													<p className="font-medium">
														{building.name}
													</p>

													<p className="text-xs text-muted-foreground">
														{building.description}
													</p>
												</div>
											</div>
										</TableCell>

										<TableCell>
											{building.isPublised ? (
												<Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
													Published
												</Badge>
											) : (
												<Badge className="bg-red-100 text-red-700 hover:bg-red-100">
													Draft
												</Badge>
											)}
										</TableCell>

										<TableCell className="text-muted-foreground">
											{new Date(
												building.createdAt,
											).toLocaleDateString()}
										</TableCell>

										<TableCell>
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
								))}
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
								{dataBuilding.length}
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

export default Building;
