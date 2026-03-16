import { tags } from "@/constants";
import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

export const systemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/system/dashboard-stats",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: [tags.dashboardStats],
    }),
    getReportsAnalytics: builder.query({
      query: () => ({
        url: "/system/reports-analytics",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: [tags.reportTag],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetReportsAnalyticsQuery } = systemApi;
