import { Loader2, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import DataPagination from "./DataPagination";
import { DataTableProps } from "./types";

export default function DataTable<T extends { id: string }>(
	props: DataTableProps<T>,
) {
	const {
		title,
		description,

		data,
		columns,
		renderCell,

		loading,

		search,
		onSearch,
		searchPlaceholder,

		addLabel,
		onAdd,

		totalData,

		page = 1,
		totalPage = 1,

		limit = 10,
		onLimitChange,
		onPageChange,
	} = props;

	const [searchValue, setSearchValue] = useState(search ?? "");

	useEffect(() => {
		setSearchValue(search ?? "");
	}, [search]);

	return (
		<Card className="shadow-sm">
			<CardHeader className="space-y-4">
				<div className="flex items-start justify-between">
					<div>
						{title && (
							<CardTitle className="text-xl">{title}</CardTitle>
						)}

						{description && (
							<p className="mt-1 text-sm text-muted-foreground">
								{description}
							</p>
						)}
					</div>

					{addLabel && (
						<Button onClick={onAdd}>
							<Plus className="mr-2 h-4 w-4" />
							{addLabel}
						</Button>
					)}
				</div>

				<div className="flex items-center justify-between gap-4">
					<div className="relative w-full max-w-sm">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

						<Input
							value={searchValue}
							onChange={(e) => {
								setSearchValue(e.target.value);
								onSearch?.(e.target.value);
							}}
							placeholder={searchPlaceholder}
							className="pl-10"
						/>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-5">
				<div className="overflow-hidden rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/40 hover:bg-muted/40">
								{columns.map((column) => (
									<TableHead
										key={String(column.key)}
										className={`font-semibold ${column.className ?? ""}`}
									>
										{column.title}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>

						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-40"
									>
										<div className="flex justify-center">
											<Loader2 className="h-6 w-6 animate-spin text-primary" />
										</div>
									</TableCell>
								</TableRow>
							) : data.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-40 text-center text-muted-foreground"
									>
										No data available.
									</TableCell>
								</TableRow>
							) : (
								data.map((item) => (
									<TableRow
										key={item.id}
										className="hover:bg-muted/40"
									>
										{columns.map((column) => (
											<TableCell
												key={String(column.key)}
												className={column.className}
											>
												{renderCell(item, column.key)}
											</TableCell>
										))}
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				<div className="flex items-center justify-between border-t pt-4">
					<p className="text-sm text-muted-foreground">
						Showing{" "}
						<span className="font-medium">{data.length}</span> of{" "}
						<span className="font-medium">{totalData ?? 0}</span>{" "}
						data
					</p>

					<DataPagination
						page={page}
						totalPage={totalPage}
						limit={limit}
						onLimitChange={onLimitChange}
						onPageChange={onPageChange}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
