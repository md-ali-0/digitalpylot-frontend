"use client";

import { CheckSquare, Search, Plus, ListFilter } from "lucide-react";
import { Button, Input } from "antd";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Boards</h1>
          <p className="text-gray-500 text-sm mt-0.5">Organize work, set priorities, and track progress across teams.</p>
        </div>
        <Button 
          type="primary" 
          icon={<Plus size={18} />} 
          className="bg-[#FF6C37] h-11 px-6 rounded-xl font-semibold border-none flex items-center gap-2"
        >
          New Task
        </Button>
      </div>

      <div className="bg-white p-24 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
          <CheckSquare size={40} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Tasks Module is Under Construction</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm leading-6 font-medium">
            A granular task management system is being implemented. You'll soon be able to assign, track, and complete work effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
