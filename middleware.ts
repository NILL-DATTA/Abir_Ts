import { NextResponse } from "next/server";


export function middleware(request: any) {
    const token = request.cookies.get("Token");

    if (!token) {
        console.log("Redirecting to /auth/login");
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    console.log("Token found, proceeding to next response");

    return NextResponse.next();
}

export const config = {
    matcher: ["/cms/createList", "/cms/list"],
};