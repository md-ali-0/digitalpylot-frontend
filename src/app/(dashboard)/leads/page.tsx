"use client";

import { Target, Search, Plus, Filter } from "lucide-react";
import { Button, Input, Table, Tag } from "antd";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">Track and convert your business prospects efficiently.</p>
        </div>
        <Button 
          type="primary" 
          icon={<Plus size={18} />} 
          className="bg-[#FF6C37] h-11 px-6 rounded-xl font-semibold border-none flex items-center gap-2"
        >
          Create Lead
        </Button>
      </div>

      <div className="bg-white p-24 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6C37]">
          <Target size={40} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Leads Module is Coming Soon</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm leading-6 font-medium">
            We're currently building a powerful lead tracking system. Once complete, you'll be able to manage your pipeline atom by atom.
          </p>
        </div>
      </div>
    </div>
  );
}
