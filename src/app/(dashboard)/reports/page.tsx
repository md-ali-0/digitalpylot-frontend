"use client";

import { BarChart3, Download } from "lucide-react";
import { Button } from "antd";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Visual insights and data exports for informed decision-making.
          </p>
        </div>
        <Button
          icon={<Download size={16} />}
          disabled
          className="h-10 px-5 rounded-xl font-medium border-gray-200 text-gray-400 flex items-center gap-2 cursor-not-allowed"
        >
          Export Data
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="py-20 flex flex-col items-center justify-center text-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
              <BarChart3 size={36} className="text-blue-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">!</span>
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Reports Engine — Coming Soon
            </h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
              Advanced analytics, custom date-range reports, and CSV/PDF exports
              are being built. Stay tuned.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Module under active development
          </div>
        </div>
      </div>
    </div>
  );
}
