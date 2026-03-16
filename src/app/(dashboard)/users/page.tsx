"use client";

import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Avatar, Input, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Clock, Search, Shield, Users } from "lucide-react";
import { useMemo, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  lastActive: string;
}

const STATUS_CONFIG = {
  ACTIVE: { label: "Active", dot: "bg-emerald-500", color: "bg-emerald-50 text-emerald-700" },
  INACTIVE: { label: "Inactive", dot: "bg-red-400", color: "bg-red-50 text-red-600" },
  PENDING: { label: "Pending", dot: "bg-amber-400", color: "bg-amber-50 text-amber-700" },
};

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-50 text-purple-700",
  manager: "bg-blue-50 text-blue-700",
  agent: "bg-emerald-50 text-emerald-700",
  customer: "bg-gray-100 text-gray-600",
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllUsersQuery(
    searchTerm ? { search: searchTerm } : {}
  );

  const users = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data?.data || []).map((user: any) => ({
        id: user.id,
        name: user.name || "Unnamed user",
        email: user.email,
        role: user.roles?.[0] || "Member",
        status: user.status,
        lastActive: new Date(
          user.updatedAt || user.createdAt
        ).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      })),
    [data]
  );

  const columns: ColumnsType<UserData> = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3 py-0.5">
          <Avatar
            size={36}
            style={{ background: "linear-gradient(135deg, #FF6C37, #f5a76e)", fontWeight: 700, fontSize: 14 }}
          >
            {text[0]}
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 leading-tight">{text}</p>
            <p className="text-xs text-gray-400 leading-tight">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const roleLower = role.toLowerCase();
        const colorClass = ROLE_COLORS[roleLower] || "bg-gray-100 text-gray-600";
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
            <Shield size={11} />
            {role}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: UserData["status"]) => {
        const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.INACTIVE;
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        );
      },
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (time) => (
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock size={12} className="shrink-0" />
          {time}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Browse team members, inspect roles, and manage permission overrides.
          </p>
        </div>
        {!isLoading && (
          <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
            <Users size={15} className="text-[#FF6C37]" />
            <span className="text-sm font-bold text-gray-900">
              {users.length}
            </span>
            <span className="text-xs text-gray-400">total</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200 text-sm"
              allowClear
            />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
              <Users size={24} className="text-gray-200" />
            </div>
            <p className="text-gray-900 font-semibold">No users found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search term.</p>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{ pageSize: 10, size: "small", className: "px-6 pb-2" }}
            className="users-table"
          />
        )}
      </div>

      <style jsx global>{`
        .users-table .ant-table {
          background: transparent !important;
        }
        .users-table .ant-table-thead > tr > th {
          background: #fafafa !important;
          color: #94a3b8 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
          font-weight: 700 !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 12px 16px !important;
        }
        .users-table .ant-table-tbody > tr > td {
          padding: 12px 16px !important;
          border-bottom: 1px solid #f8fafc !important;
        }
        .users-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }
        .users-table .ant-table-tbody > tr:hover > td {
          background: #fafafa !important;
        }
      `}</style>
    </div>
  );
}
