import { TArgsParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tags } from "@/constants";

const url = `/leads`;

export const leadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeads: builder.query({
      query: (args: TArgsParam) => ({
        url: `${url}`,
        method: "GET",
        params: args,
      }),
      transformResponse: (response: TResponseRedux<any[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: [tags.leadsTag],
    }),
    getSingleLead: builder.query({
      query: (id: string) => ({
        url: `${url}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: (result, error, id) => [{ type: tags.leadsTag, id }],
    }),
    createLead: builder.mutation({
      query: (data) => ({
        url: url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.leadsTag],
    }),
    updateLead: builder.mutation({
      query: (args) => ({
        url: `${url}/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: (result, error, args) => [
        tags.leadsTag,
        { type: tags.leadsTag, id: args.id },
      ],
    }),
    deleteLead: builder.mutation({
      query: (id: string) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.leadsTag],
    }),
  }),
});

export const {
  useGetAllLeadsQuery,
  useGetSingleLeadQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadsApi;
