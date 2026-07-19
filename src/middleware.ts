import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import environment from "@/config/environment";

// NextRequest digunakan untuk mengakses informasi tentang request yang dilakukan user

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token: JWT | null = await getToken({
		req: request,
		secret: environment.SECRET,
	});
	console.log("Token:", token);

	if (pathname === "/login" || pathname === "/register") {
		if (token) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	// if (pathname.startsWith("/admin")) {
	// 	if (!token) {
	// 		const url = new URL("/auth/login", request.url);
	// 		url.searchParams.set("callbackUrl", encodeURI(request.url));
	// 		return NextResponse.redirect(url);
	// 	}

	// 	if (token?.user?.role !== "admin") {
	// 		return NextResponse.redirect(new URL("/", request.url));
	// 	}

	// 	if (pathname === "/admin") {
	// 		return NextResponse.redirect(
	// 			new URL("/admin/accomodation", request.url),
	// 		);
	// 	}
	// }
	// if (pathname.startsWith("/member")) {
	// 	if (!token) {
	// 		const url = new URL("/auth/login");
	// 		url.searchParams.set("callbackUrl", encodeURI(request.url));
	// 		return NextResponse.redirect(url);
	// 	}
	// 	if (pathname === "/member") {
	// 		return NextResponse.redirect("/member");
	// 	}
	// }

	return NextResponse.next(); // <- wajib
}

export const config = {
	matcher: ["/login", "/register"],
};

// "/admin/:path*", "/member/:path*"
