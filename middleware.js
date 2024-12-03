import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const response = NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && request.nextUrl.pathname !== "/Login") {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (request.nextUrl.pathname === "/ContoErotico") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const themePreference = request.cookies.get("theme");
  if (!themePreference) {
    response.cookies.set("theme", "light");
  }

  return response;
}

export const config = {
  matcher: ["/painel", "/profile", "/dashboard", "/settings", "/ContoErotico"], // Adicione todas as rotas que você deseja proteger
};
