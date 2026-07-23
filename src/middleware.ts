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

	if (pathname === "/login" || pathname === "/register") {
		if (token) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (pathname.startsWith("/admin")) {
		if (!token) {
			const url = new URL("/login", request.url);
			url.searchParams.set("callbackUrl", encodeURI(request.url));
			return NextResponse.redirect(url);
		}

		if (token?.user?.role?.name !== "SUPER_ADMIN") {
			return NextResponse.redirect(new URL("/", request.url));
		}

		if (pathname === "/admin") {
			return NextResponse.redirect(new URL("/admin/spaces", request.url));
		}
	}
	if (pathname.startsWith("/users")) {
		if (!token) {
			const url = new URL("/login");
			url.searchParams.set("callbackUrl", encodeURI(request.url));
			return NextResponse.redirect(url);
		}
		if (token?.user?.role?.name !== "USER") {
			return NextResponse.redirect(new URL("/", request.url));
		}

		if (pathname === "/users") {
			return NextResponse.redirect(new URL("/users/spaces", request.url));
		}
	}

	return NextResponse.next(); // <- wajib
}

export const config = {
	matcher: ["/login", "/register", "/admin/:path*", "/users/:path*"],
};
