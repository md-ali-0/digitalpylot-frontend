"use client";

import { BarChart3, Download, Calendar } from "lucide-react";
import { Button } from "antd";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 text-sm mt-0.5">Visual insights and detailed data exports for informed decision making.</p>
        </div>
        <Button 
          icon={<Download size={18} />} 
          className="h-11 px-6 rounded-xl font-semibold border-gray-200 flex items-center gap-2 text-gray-600"
        >
          Export Data
        </Button>
      </div>

      <div className="bg-white p-24 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
          <BarChart3 size={40} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Reports Engine is Warming Up</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm leading-6 font-medium">
            Advanced analytics and custom reporting tools are being developed. Get ready for deep data-driven insights.
          </p>
        </div>
      </div>
    </div>
  );
}
