"use client";

import { useRef } from "react";

const useDebounce = () => {
	const timeout = useRef<NodeJS.Timeout | null>(null);

	return (callback: () => void, delay = 500) => {
		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		timeout.current = setTimeout(callback, delay);
	};
};

export default useDebounce;