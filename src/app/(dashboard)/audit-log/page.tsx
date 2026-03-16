"use client";

import { History, RefreshCw } from "lucide-react";
import { Button, Spin } from "antd";
import { useGetAuditLogsQuery } from "@/redux/features/rbac/rbacApi";

export default function AuditLogPage() {
  const { data, isLoading, refetch } = useGetAuditLogsQuery();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Append-only timeline of RBAC, user, and management actions.
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          icon={<RefreshCw size={18} />}
          className="h-11 px-6 rounded-xl font-semibold border-gray-200 flex items-center gap-2 text-gray-600"
        >
          Refresh Logs
        </Button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : data && data.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {data.map((log) => (
              <div key={log.id} className="p-6 flex items-start justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-500">
                    {log.resourceType}
                    {log.resourceId ? ` • ${log.resourceId}` : ""}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="max-w-md text-right text-xs text-gray-400">
                  {log.ipAddress || "No IP"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-24 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
              <History size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">No audit entries yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm leading-6 font-medium">
                Once access rules or user management actions run, they will appear here with timestamps.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
