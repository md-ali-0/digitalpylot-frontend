"use client";

import { useCreateTaskMutation, useGetAllTasksQuery } from "@/redux/features/tasks/tasksApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Avatar, Input, Spin, Tag, Tooltip, Button, Modal, Form, Select, DatePicker, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Search, CheckSquare, Clock, User, AlertCircle, Calendar, Plus } from "lucide-react";
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

const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];
const TASK_PRIORITIES = ["HIGH", "MEDIUM", "LOW"];

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data, isLoading } = useGetAllTasksQuery(
    searchTerm ? { search: searchTerm } : {}
  );
  const { data: usersData } = useGetAllUsersQuery({});
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();

  const handleCreateTask = async (values: any) => {
    try {
      // Format date for backend
      const submitData = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : undefined,
      };
      await createTask(submitData).unwrap();
      message.success("Task created successfully");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to create task");
    }
  };

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
        <div className="flex items-center gap-3">
          {!isLoading && (
            <div className="hidden md:flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
              <Clock size={15} className="text-[#FF6C37]" />
              <span className="text-sm font-bold text-gray-900">{tasks.length}</span>
              <span className="text-xs text-gray-400">active tasks</span>
            </div>
          )}
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
            className="h-10 px-5 rounded-xl bg-[#FF6C37] hover:bg-[#e85a29] border-none font-bold"
          >
            Add Task
          </Button>
        </div>
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

        <Modal
          title={<span className="text-lg font-bold text-gray-900">Create New Task</span>}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
          className="rounded-2xl"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateTask}
            className="mt-4"
          >
            <Form.Item
              name="title"
              label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Task Title</span>}
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="E.g. Follow up with client" className="h-10 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</span>}
            >
              <Input.TextArea placeholder="Details about the task..." className="rounded-xl" rows={3} />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="status"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</span>}
                initialValue="TODO"
              >
                <Select className="h-10 w-full text-sm">
                  {TASK_STATUSES.map((status) => (
                    <Select.Option key={status} value={status}>
                      {status.replace("_", " ")}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="priority"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Priority</span>}
                initialValue="MEDIUM"
              >
                <Select className="h-10 w-full text-sm">
                  {TASK_PRIORITIES.map((priority) => (
                    <Select.Option key={priority} value={priority}>
                      {priority}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="dueDate"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Due Date</span>}
              >
                <DatePicker className="h-10 w-full rounded-xl" />
              </Form.Item>

              <Form.Item
                name="assignedToId"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Assign To</span>}
              >
                <Select placeholder="Select user" className="h-10 w-full" allowClear>
                  {usersData?.data?.map((user: any) => (
                    <Select.Option key={user.id} value={user.id}>
                      {user.name || user.email}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="h-10 rounded-xl font-bold text-gray-400 border-none"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreating}
                className="h-10 px-8 rounded-xl bg-[#FF6C37] hover:bg-[#e85a29] border-none font-bold"
              >
                Create Task
              </Button>
            </div>
          </Form>
        </Modal>

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
