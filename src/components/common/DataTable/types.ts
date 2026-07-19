import { ReactNode } from "react";

export interface Column<T> {
	key: keyof T | "actions";
	title: string;
	className?: string;
}

export interface DataTableProps<T> {
	title?: string;
	description?: string;

	data: T[];
	columns: Column<T>[];

	renderCell: (item: T, key: keyof T | "actions") => ReactNode;

	loading?: boolean;

	search?: string;
	onSearch?: (value: string) => void;
	searchPlaceholder?: string;

	addLabel?: string;
	onAdd?: () => void;

	totalData?: number;

	page?: number;
	totalPage?: number;

	limit?: number;
	onLimitChange?: (value: number) => void;

	onPageChange?: (page: number) => void;
}
