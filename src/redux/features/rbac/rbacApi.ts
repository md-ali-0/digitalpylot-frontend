import { tags } from "@/constants";
import { baseApi } from "../../api/baseApi";

export interface AuditLogEntry {
  // ... existing interface ...
}

// ... existing interface ...

const rbacApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsCatalog: builder.query<PermissionCatalogItem[], void>({
      query: () => ({
        url: "/permissions",
        method: "GET",
      }),
      transformResponse: (response: { data: PermissionCatalogItem[] }) => response.data,
      providesTags: [tags.permissionTag],
    }),
    getUserPermissions: builder.query<
      {
        user: { id: string; name?: string; email: string; roles: string[] };
        directPermissions: string[];
        effectivePermissions: string[];
        grantablePermissions: PermissionCatalogItem[];
      },
      string
    >({
      query: (userId) => ({
        url: `/users/${userId}/permissions`,
        method: "GET",
      }),
      transformResponse: (response: {
        data: {
          user: { id: string; name?: string; email: string; roles: string[] };
          directPermissions: string[];
          effectivePermissions: string[];
          grantablePermissions: PermissionCatalogItem[];
        };
      }) => response.data,
      providesTags: [tags.permissionTag, tags.userTag],
    }),
    updateUserPermissions: builder.mutation<
      unknown,
      { userId: string; permissionNames: string[] }
    >({
      query: ({ userId, permissionNames }) => ({
        url: `/users/${userId}/permissions`,
        method: "PUT",
        body: { permissionNames },
      }),
      invalidatesTags: [tags.permissionTag, tags.userTag, tags.roleTag],
    }),
    getAuditLogs: builder.query<AuditLogEntry[], void>({
      query: () => ({
        url: "/audit-logs",
        method: "GET",
      }),
      transformResponse: (response: { data: AuditLogEntry[] }) => response.data,
      providesTags: [tags.auditLogTag],
    }),
  }),
});

export const {
  useGetPermissionsCatalogQuery,
  useGetUserPermissionsQuery,
  useUpdateUserPermissionsMutation,
  useGetAuditLogsQuery,
} = rbacApi;
