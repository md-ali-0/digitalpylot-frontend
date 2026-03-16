import { tags, userTags } from "@/constants";
import { TArgsParam, TResponseRedux, User } from "@/types";
import { baseApi } from "../../api/baseApi";

const url = `/users`;

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkUsername: builder.query({
      query: (username) => ({
        url: `/users/check-username?username=${username}`,
        method: "GET",
      }),
    }),
    getAllUsers: builder.query({
      query: (args: TArgsParam) => {
        const cleanedParams = Object.entries(args || {}).reduce(
          (acc, [key, value]) => {
            if (
              value !== null &&
              value !== undefined &&
              value !== "" &&
              value !== "all"
            ) {
              acc[key] = value;
            }
            return acc;
          },
          {} as TArgsParam,
        );

        return {
          url: `${url}`,
          params: cleanedParams,
        };
      },
      transformResponse: (response: TResponseRedux<User[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: [userTags.all],
    }),
    // Get all affiliates (Admin only)

    // Get affiliate statistics

    // Get all advertisers (Admin only)

    // Get all managers (Admin only)

    getSingleUser: builder.query({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "GET",
      }),

      transformResponse: (response: TResponseRedux<User>) => {
        return response.data;
      },
      providesTags: [tags.userTag],
    }),
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: url,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [
        tags.userTag,
        userTags.all,
        userTags.user,
        userTags.role,
      ],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `${url}/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
      invalidatesTags: [
        userTags.all,
        tags.userTag,
        userTags.user,
        userTags.role,
      ],
    }),
    // Handle affiliate status (approve/reject/etc)

    // Update advertiser status (approve/reject with reason)

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `${url}/${id}/soft`,
          method: "DELETE",
        };
      },
      invalidatesTags: [
        userTags.all,
        tags.userTag,
        userTags.user,
        userTags.role,
      ],
    }),

    // Bulk actions for affiliates
  }),
});

export const {
  useGetAllUsersQuery,
  useCheckUsernameQuery,
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
