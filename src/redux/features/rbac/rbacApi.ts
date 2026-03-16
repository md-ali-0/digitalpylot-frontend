import { baseApi } from "../../api/baseApi";

export interface AuditLogEntry {
  id: string;
  tenantId: string;
  userId?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  changes?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

export interface PermissionCatalogItem {
  module: string;
  atom: string;
  name: string;
  description: string;
}

const rbacApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPermissionsCatalog: builder.query<PermissionCatalogItem[], void>({
      query: () => ({
        url: "/permissions",
        method: "GET",
      }),
      transformResponse: (response: { data: PermissionCatalogItem[] }) => response.data,
      providesTags: ["Permission"],
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
      providesTags: ["Permission", "User"],
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
      invalidatesTags: ["Permission", "User", "Role"],
    }),
    getAuditLogs: builder.query<AuditLogEntry[], void>({
      query: () => ({
        url: "/audit-logs",
        method: "GET",
      }),
      transformResponse: (response: { data: AuditLogEntry[] }) => response.data,
      providesTags: ["Permission"],
    }),
  }),
});

export const {
  useGetPermissionsCatalogQuery,
  useGetUserPermissionsQuery,
  useUpdateUserPermissionsMutation,
  useGetAuditLogsQuery,
} = rbacApi;
