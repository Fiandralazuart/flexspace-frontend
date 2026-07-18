import { Metadata } from "next";
import { ReactNode } from "react";

interface PropTypes {
	children: ReactNode;
}

export const AuthLayout = (props: PropTypes) => {
	const { children } = props;

	return <div className="min-h-screen">{children}</div>;
};
