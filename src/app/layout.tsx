import "./globals.css";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "FlexSpace",
		template: "%s | FlexSpace",
	},
	description: "Smart Space Management",
};

const geist = Geist({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={geist.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
