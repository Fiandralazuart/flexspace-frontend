"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const useQueryParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get("page") ?? DEFAULT_PAGE);
	const limit = Number(searchParams.get("limit") ?? DEFAULT_LIMIT);
	const search = searchParams.get("search") ?? "";

	const updateQuery = useCallback(
		(params: Record<string, string | number | undefined | null>) => {
			const query = new URLSearchParams(searchParams.toString());

			Object.entries(params).forEach(([key, value]) => {
				if (value === "" || value === undefined || value === null) {
					query.delete(key);
				} else {
					query.set(key, String(value));
				}
			});

			router.replace(`${pathname}?${query.toString()}`);
		},
		[pathname, router, searchParams],
	);

	return {
		page,
		limit,
		search,
		updateQuery,
	};
};

export default useQueryParams;
