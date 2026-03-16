"use client";

import { useSelector } from "react-redux";
import { 
  Users, 
  Target, 
  CheckSquare, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const STATS = [
  {
    label: "Total Users",
    value: "1,248",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    label: "Active Leads",
    value: "452",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    color: "bg-orange-500",
  },
  {
    label: "Pending Tasks",
    value: "12",
    change: "-2.4%",
    trend: "down",
    icon: CheckSquare,
    color: "bg-emerald-500",
  },
  {
    label: "Conversion Rate",
    value: "24.8%",
    change: "+1.2%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
];

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || "User"}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} bg-opacity-10 flex items-center justify-center text-white`}>
                <stat.icon className={`w-6 h-6 ${stat.color?.replace('bg-', 'text-')}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-[#FF6C37] transition-colors">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-80 flex items-center justify-center text-gray-400 font-medium italic">
          Leads Overview Chart Component
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-80 flex items-center justify-center text-gray-400 font-medium italic">
          Recent Activity Component
        </div>
      </div>
    </div>
  );
}
