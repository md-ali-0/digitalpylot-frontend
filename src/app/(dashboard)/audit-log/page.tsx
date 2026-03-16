"use client";

import { useGetAuditLogsQuery } from "@/redux/features/rbac/rbacApi";
import { Button, Spin } from "antd";
import { Clock, History, RefreshCw, User } from "lucide-react";

const ACTION_COLORS: Record<string, { dot: string; bg: string; text: string }> = {
  CREATE: { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
  UPDATE: { dot: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
  DELETE: { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700" },
  LOGIN: { dot: "bg-purple-500", bg: "bg-purple-50", text: "text-purple-700" },
  LOGOUT: { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600" },
  GRANT: { dot: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-700" },
  REVOKE: { dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
};

function getActionStyle(action: string) {
  const key = Object.keys(ACTION_COLORS).find((k) =>
    action?.toUpperCase().includes(k)
  );
  return key
    ? ACTION_COLORS[key]
    : { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600" };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AuditLogPage() {
  const { data, isLoading, refetch } = useGetAuditLogsQuery();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Append-only activity trail of RBAC and user management actions.
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          icon={<RefreshCw size={16} />}
          className="h-10 px-5 rounded-xl font-medium border-gray-200 text-gray-600 flex items-center gap-2"
        >
          Refresh
        </Button>
      </div>

      {/* Log List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : data && data.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_160px_120px_100px] gap-4 px-6 py-3 bg-gray-50/80">
              {["Action / Resource", "User", "IP Address", "Time"].map((h) => (
                <span key={h} className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {h}
                </span>
              ))}
            </div>

            {data.map((log) => {
              const style = getActionStyle(log.action);
              return (
                <div
                  key={log.id}
                  className="grid grid-cols-[1fr_160px_120px_100px] gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors"
                >
                  {/* Action */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
                        >
                          {log.action}
                        </span>
                        {log.resourceType && (
                          <span className="text-xs text-gray-500 font-medium truncate">
                            {log.resourceType}
                          </span>
                        )}
                      </div>
                      {log.resourceId && (
                        <p className="text-[11px] text-gray-300 mt-0.5 font-mono truncate">
                          #{log.resourceId.slice(0, 8)}…
                        </p>
                      )}
                    </div>
                  </div>

                  {/* User */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <User size={12} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-600 truncate font-medium">
                      {log.userId ? `#${log.userId.slice(0, 8)}` : "System"}
                    </span>
                  </div>

                  {/* IP */}
                  <span className="text-xs text-gray-400 font-mono">
                    {log.ipAddress || "—"}
                  </span>

                  {/* Time */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{timeAgo(log.createdAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
              <History size={32} className="text-gray-200" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">No audit entries yet</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto mt-1 leading-relaxed">
                Once access rules or user management actions run, they will appear here with timestamps.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
