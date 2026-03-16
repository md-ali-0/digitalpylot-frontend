import { tags, userTags } from "@/constants";
import { TResponseRedux, User } from "@/types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: [tags.userTag],
      transformResponse: (response: TResponseRedux<User>) => {
        return response.data;
      },
    }),

    verifyEmail: builder.mutation({
      query: (token) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: { token },
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: (payload: { email: string; tenantId?: string } | string) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body:
          typeof payload === "string"
            ? { email: payload }
            : { email: payload.email, tenantId: payload.tenantId },
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data: { email: string; tenantId?: string }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/me/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
