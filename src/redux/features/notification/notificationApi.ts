import { tags } from "@/constants";
import { TArgsParam, TResponse } from "@/types/global";
import { TNotification } from "@/types/notifications";
import { baseApi } from "../../api/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      TResponse<TNotification[]>,
      TArgsParam | undefined
    >({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params,
      }),
      providesTags: [tags.notificationTag],
    }),
    markNotificationAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: [tags.notificationTag],
    }),
    markAllNotificationsAsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: [tags.notificationTag],
    }),
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.notificationTag],
    }),
    getNotificationUnreadCount: builder.query<{ count: number }, void>({
      query: () => ({
        url: "/notifications/unread-count",
        method: "GET",
      }),
      transformResponse: (response: TResponse<{ count: number }>) =>
        response.data!,
      providesTags: [tags.notificationTag],
    }),
    sendAnnouncement: builder.mutation({
      query: (body) => ({
        url: "/notifications/announcement",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useGetNotificationUnreadCountQuery,
  useSendAnnouncementMutation,
} = notificationApi;
