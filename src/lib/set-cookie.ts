import { cookies } from "next/headers";

export async function SetAccessToken(token: string, expiresAt: Date) {
  (await cookies()).set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    expires: expiresAt,
  });
}

export async function SetRefreshToken(token: string, expiresAt: Date) {
  (await cookies()).set("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    expires: expiresAt,
  });
}

export async function SetPermissions(permissions: string, expiresAt: Date) {
  (await cookies()).set("permissions", permissions, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    expires: expiresAt,
  });
}
