"use client";

import { useMemo, useState } from "react";
import { Search, Filter, Shield, Clock } from "lucide-react";
import { App, Avatar, Button, Input, Spin, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  lastActive: string;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { message } = App.useApp();
  const { data, isLoading } = useGetAllUsersQuery(searchTerm ? { search: searchTerm } : {});

  const users = useMemo(
    () =>
      (data?.data || []).map((user: any) => ({
        id: user.id,
        name: user.name || "Unnamed user",
        email: user.email,
        role: user.roles?.[0] || "Member",
        status: user.status,
        lastActive: new Date(user.updatedAt || user.createdAt).toLocaleString(),
      })),
    [data],
  );

  const columns: ColumnsType<UserData> = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar className="bg-orange-50 text-[#FF6C37] font-bold">{text[0]}</Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 leading-tight">{text}</span>
            <span className="text-xs text-gray-500">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <Shield size={14} className="text-gray-400" />
          {role}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: UserData["status"]) => {
        const config = {
          ACTIVE: { color: "success", label: "Active" },
          INACTIVE: { color: "error", label: "Inactive" },
          PENDING: { color: "processing", label: "Pending" },
        };
        return (
          <Tag bordered={false} color={config[status].color} className="font-medium rounded-full px-3">
            {config[status].label}
          </Tag>
        );
      },
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (time) => (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock size={14} className="text-gray-300" />
          {time}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Browse users, inspect roles, and manage direct permission grants from one place.
          </p>
        </div>
        <Button
          onClick={() => message.info("Create user endpoint is available at POST /api/v1/users.")}
          className="h-11 px-6 rounded-xl font-semibold border-gray-200 text-gray-700"
        >
          API Ready
        </Button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button icon={<Filter size={16} />} className="rounded-xl h-10 text-gray-600 font-medium">
              Filter
            </Button>
            <Button className="rounded-xl h-10 text-gray-600 font-medium">Permission Aware</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{ pageSize: 10, className: "px-6" }}
            className="custom-table"
          />
        )}
      </div>

      <style jsx global>{`
        .custom-table .ant-table {
          background: transparent !important;
        }
        .custom-table .ant-table-thead > tr > th {
          background: #fcfcfc !important;
          color: #94a3b8 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          font-weight: 700 !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 16px 24px !important;
        }
        .custom-table .ant-table-tbody > tr > td {
          padding: 16px 24px !important;
          border-bottom: 1px solid #f8fafc !important;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background: #fafafa !important;
        }
      `}</style>
    </div>
  );
}
