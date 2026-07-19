import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { PAGE_LIMIT } from "./constants";

interface Props {
	page: number;
	totalPage: number;

	limit: number;

	onLimitChange?: (limit: number) => void;
	onPageChange?: (page: number) => void;
}

export default function DataPagination(props: Props) {
	const { page, totalPage, limit, onLimitChange, onPageChange } = props;

	return (
		<div className="flex items-center justify-between border-t pt-4">
			<div className="flex items-center gap-2">
				<p className="text-sm text-muted-foreground">Rows</p>

				<Select
					value={String(limit)}
					onValueChange={(v) => onLimitChange?.(Number(v))}
				>
					<SelectTrigger className="w-20">
						<SelectValue />
					</SelectTrigger>

					<SelectContent>
						{PAGE_LIMIT.map((item) => (
							<SelectItem key={item} value={String(item)}>
								{item}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => page > 1 && onPageChange?.(page - 1)}
						/>
					</PaginationItem>

					{Array.from(
						{
							length: totalPage,
						},
						(_, i) => (
							<PaginationItem key={i}>
								<PaginationLink
									isActive={page === i + 1}
									onClick={() => onPageChange?.(i + 1)}
								>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						),
					)}

					<PaginationItem>
						<PaginationNext
							onClick={() =>
								page < totalPage && onPageChange?.(page + 1)
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
