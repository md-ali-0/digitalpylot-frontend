"use client";

import { BarChart3, Download, TrendingUp, Target, CheckSquare, Layers } from "lucide-react";
import { Button, Spin, Empty } from "antd";
import { useGetReportsAnalyticsQuery } from "@/redux/features/system/systemApi";

export default function ReportsPage() {
  const { data, isLoading } = useGetReportsAnalyticsQuery(undefined);

  const leadPerf = data?.leadPerf || {};
  const taskAnal = data?.taskAnal || {};

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spin size="large" tip="Generating reports..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Deep dive into your CRM performance and team productivity.
          </p>
        </div>
        <Button
          icon={<Download size={16} />}
          className="h-10 px-5 rounded-xl font-medium border-gray-200 text-gray-600 flex items-center gap-2"
        >
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Performance by Source */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <Target size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Leads by Source</h3>
          </div>
          <div className="space-y-4">
            {Object.keys(leadPerf.bySource || {}).length > 0 ? (
              Object.entries(leadPerf.bySource).map(([source, count]: [string, any]) => (
                <div key={source} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>{source}</span>
                    <span className="text-gray-900">{count}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (count / 10) * 100)}%` }} // Arbitrary max 10 for visual
                    />
                  </div>
                </div>
              ))
            ) : (
              <Empty description="No lead data found" />
            )}
          </div>
        </div>

        {/* Task Priority Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <Layers size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Task Priorities</h3>
          </div>
          <div className="space-y-4">
            {Object.keys(taskAnal.byPriority || {}).length > 0 ? (
              Object.entries(taskAnal.byPriority).map(([priority, count]: [string, any]) => {
                const colors: Record<string, string> = {
                  HIGH: "bg-rose-500",
                  MEDIUM: "bg-orange-500",
                  LOW: "bg-blue-400"
                };
                return (
                  <div key={priority} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                      <span>{priority}</span>
                      <span className="text-gray-900">{count}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[priority] || 'bg-gray-400'} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(100, (count / 5) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty description="No task priority data" />
            )}
          </div>
        </div>
      </div>

      {/* Task Status Overview */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <CheckSquare size={20} />
          </div>
          <h3 className="font-bold text-gray-900">Team Productivity</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(taskAnal.byStatus || {}).map(([status, count]: [string, any]) => (
            <div key={status} className="p-4 rounded-xl border border-gray-50 flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{status.replace('_', ' ')}</span>
              <span className="text-3xl font-black text-gray-900">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
