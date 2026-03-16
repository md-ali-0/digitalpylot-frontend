import config from "@/config";
import { signout } from "@/service/auth";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const baseQuery = fetchBaseQuery({
  baseUrl: `${config.host}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    const user = (getState() as RootState).auth.user;
    if (user?.tenantId) {
      headers.set("x-tenant-id", user.tenantId);
    }
    //  else {
    //    headers.set("x-tenant-id", "22d6f140-e42d-480f-8e2f-ea061e4c0b4f"); // Default fallback
    // }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOption): Promise<any> => {
  // Ensure args is properly structured
  if (!args) {
    return { error: { status: 400, data: "Invalid request parameters" } };
  }

  // Handle case where args might be a string URL
  if (typeof args === "string") {
    args = { url: args } as FetchArgs;
  }

  // Ensure url is present
  if (!args.url) {
    return { error: { status: 400, data: "URL is required" } };
  }

  const result = await baseQuery(args, api, extraOption);

  if (result?.error?.status === 401) {
    // const res = await fetch(`${config.host}api/v1/auth/refresh-token`, {
    //     method: "POST",
    //     credentials: "include",
    // });
    // const data = await res.json();
    // if (data?.data?.accessToken) {
    //     api.dispatch(update({ accessToken: data?.data?.accessToken }));
    //     result = await baseQuery(args, api, extraOption);
    // }
    await signout();
    // api.dispatch(baseApi.util.resetApiState());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["Auth", "User", "Role", "Permission", "Media", "Notification"],
});
