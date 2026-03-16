"use client";

import { useGetAllTasksQuery } from "@/redux/features/tasks/tasksApi";
import { Avatar, Input, Spin, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Search, CheckSquare, Clock, User, AlertCircle, Calendar } from "lucide-react";
import { useMemo, useState } from "react";

interface TaskData {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
}

const STATUS_COLORS: Record<string, string> = {
  TODO: "processing",
  IN_PROGRESS: "warning",
  DONE: "success",
  CANCELLED: "default",
};

const PRIORITY_COLORS: Record<string, string> = {
  HIGH: "volcano",
  MEDIUM: "orange",
  LOW: "blue",
};

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllTasksQuery(
    searchTerm ? { search: searchTerm } : {}
  );

  const tasks = useMemo(
    () =>
      (data?.data || []).map((task: any) => ({
        id: task.id,
        title: task.title || "Untitled Task",
        status: task.status || "TODO",
        priority: task.priority || "MEDIUM",
        assignedTo: task.assignedTo?.name || "Unassigned",
        dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date",
      })),
    [data]
  );

  const columns: ColumnsType<TaskData> = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF6C37]">
            <CheckSquare size={16} />
          </div>
          <span className="font-semibold text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={STATUS_COLORS[status] || "default"}>{status.replace("_", " ")}</Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={PRIORITY_COLORS[priority] || "blue"}>{priority}</Tag>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (name) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={14} className="text-gray-300" />
          {name}
        </div>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => (
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={12} />
          {date}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Track actions, deadlines, and responsibilities across your team.
          </p>
        </div>
        {!isLoading && (
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
            <Clock size={15} className="text-[#FF6C37]" />
            <span className="text-sm font-bold text-gray-900">{tasks.length}</span>
            <span className="text-xs text-gray-400">active tasks</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200 text-sm"
              allowClear
            />
          </div>
        </div>

        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
              <AlertCircle size={24} className="text-gray-200" />
            </div>
            <p className="text-gray-900 font-semibold">No tasks found</p>
            <p className="text-gray-400 text-sm">Assign new tasks to get started.</p>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={tasks}
            rowKey="id"
            pagination={{ pageSize: 10, size: "small", className: "px-6 pb-2" }}
            className="tasks-table"
          />
        )}
      </div>

      <style jsx global>{`
        .tasks-table .ant-table { background: transparent !important; }
        .tasks-table .ant-table-thead > tr > th {
          background: #fafafa !important;
          color: #94a3b8 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
          font-weight: 700 !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 12px 16px !important;
        }
        .tasks-table .ant-table-tbody > tr > td {
          padding: 12px 16px !important;
          border-bottom: 1px solid #f8fafc !important;
        }
      `}</style>
    </div>
  );
}
