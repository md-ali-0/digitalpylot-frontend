import { tags } from "@/constants/tags";
import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const ROLE_URL = "/roles";
const PERMISSION_URL = "/permissions";

export const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Roles
    getRoles: builder.query({
      query: (arg: Record<string, any>) => ({
        url: ROLE_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tags.roleTag],
    }),
    getRole: builder.query({
      query: (id: string) => ({
        url: `${ROLE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tags.roleTag],
    }),
    createRole: builder.mutation({
      query: (data) => ({
        url: ROLE_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.roleTag],
    }),
    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ROLE_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.roleTag],
    }),
    deleteRole: builder.mutation({
      query: (id: string) => ({
        url: `${ROLE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.roleTag],
    }),

    // Permissions
    getPermissions: builder.query({
      query: () => ({
        url: PERMISSION_URL,
        method: "GET",
      }),
      providesTags: [tags.permissionTag],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetPermissionsQuery,
} = roleApi;
