import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL("/auth/signin", request.url);
  const response = NextResponse.redirect(url);

  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("permissions");

  return response;
}
