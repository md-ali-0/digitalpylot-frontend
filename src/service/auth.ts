"use server";

import config from "@/config";
import { decrypt } from "@/lib/session";
import { SetAccessToken, SetRefreshToken } from "@/lib/set-cookie";
import {
  passwordSetSchema,
  PasswordSetValues,
} from "@/schema/change-password.schema";
import { loginSchema } from "@/schema/signin.schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SigninFormValues {
  email: string;
  password: string;
}

export async function signin(formData: SigninFormValues) {
  const validatedFields = loginSchema.safeParse({
    email: formData.email,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${config.host}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": "default", // Default tenant for now
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      credentials: "include",
    });

    const result = await res.json();

    console.log(result);
    

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    if (result?.success) {
      const decryptedAccessToken = await decrypt(result?.data?.accessToken);
      const decryptedRefreshToken = await decrypt(result?.data?.refreshToken);

      const accessTokenExpire = new Date(
        (decryptedAccessToken?.exp || Math.floor(Date.now() / 1000) + 15 * 60) *
          1000,
      );
      const refreshTokenExpire = new Date(
        (decryptedRefreshToken?.exp ||
          Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60) * 1000,
      );

      await SetAccessToken(result?.data?.accessToken, accessTokenExpire);
      await SetRefreshToken(result?.data?.refreshToken, refreshTokenExpire);
    }
    // Return success response
    return {
      success: result?.success,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function googleSignIn(code: string) {
  try {
    const res = await fetch(`${config.host}/api/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (result?.success)
      await SetAccessToken(result?.data?.accessToken, expiresAt);

    // Return success response
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // Handle any network or unexpected errors
    return {
      success: false,
      error,
    };
  }
}

export async function ChangePassword(formData: PasswordSetValues) {
  const validatedFields = passwordSetSchema.safeParse({
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword,
    confirmPassword: formData.confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${config.host}/api/v1/users/me/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken ?? ""}`,
      },
      body: JSON.stringify({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }),
      credentials: "include",
    });

    const result = await res.json();
    cookieStore.delete("is_change_password");

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Password Change failed",
      };
    }
    // Return success response
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function signout() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("accessToken");

  cookieStore.delete("permissions");

  fetch(config.host + "/api/v1/auth/logout", {
    headers: {
      Authorization: `Bearer ${accessTokenCookie?.value ?? ""}`,
    },
    method: "POST",
    cache: "no-store",
    credentials: "include",
  });
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/auth/signin");
}
