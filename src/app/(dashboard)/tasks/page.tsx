"use client";

import { CheckSquare, Plus } from "lucide-react";
import { Button } from "antd";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Boards</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Assign and track work across your team.
          </p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          disabled
          className="bg-[#FF6C37] h-10 px-5 rounded-xl font-semibold border-none flex items-center gap-2 opacity-60 cursor-not-allowed"
        >
          New Task
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="py-20 flex flex-col items-center justify-center text-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <CheckSquare size={36} className="text-emerald-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">!</span>
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Task Boards — Coming Soon
            </h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
              Granular task assignment with priority tracking, deadlines, and
              kanban-style boards are on the way.
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
