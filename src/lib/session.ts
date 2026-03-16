"use server";

import { normalizeRole } from "@/constants/roles";
import { TSession } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import "server-only";

export interface DecryptedSession {
  userId: string | null;
  email: string;
  roles: string[];
  permissions?: string[];
  tenantId: string;
  iat: number;
  exp: number;
  name?: string;
}

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) {
      throw new Error("No session token provided");
    }
    const payload = jwtDecode<DecryptedSession>(session);

    if (payload.exp * 1000 < Date.now()) {
      throw new Error("Session token expired");
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<TSession> {
  const cookie = (await cookies()).get("accessToken")?.value;

  if (cookie) {
    const session = await decrypt(cookie);

    if (session?.userId) {
      const userType =
        session.roles && session.roles.length > 0
          ? normalizeRole(session.roles[0])
          : "GUEST";

      return {
        isAuth: true,
        user: {
          email: session.email,
          name: session.name || "User",
        },
        roles: session.roles || [],
        user_type: userType,
        tenantId: session.tenantId ?? null,
      };
    }
  }

  return {
    isAuth: false,
    user: null,
    roles: [],
    user_type: "GUEST",
    tenantId: null,
  };
}
