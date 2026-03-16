import { TArgsParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { tags } from "@/constants";

const url = `/tasks`;

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: (args: TArgsParam) => ({
        url: `${url}`,
        method: "GET",
        params: args,
      }),
      transformResponse: (response: TResponseRedux<any[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: [tags.tasksTag],
    }),
    getSingleTask: builder.query({
      query: (id: string) => ({
        url: `${url}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
      providesTags: (result, error, id) => [{ type: tags.tasksTag, id }],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: url,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.tasksTag],
    }),
    updateTask: builder.mutation({
      query: (args) => ({
        url: `${url}/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: (result, error, args) => [
        tags.tasksTag,
        { type: tags.tasksTag, id: args.id },
      ],
    }),
    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.tasksTag],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
