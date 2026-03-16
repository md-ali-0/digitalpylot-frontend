"use client";

import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import {
  ArrowUpRight,
  CheckSquare,
  LayoutDashboard,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const { data: usersData } = useGetAllUsersQuery({});
  const totalUsers = usersData?.data?.length ?? "—";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#FF6C37] to-orange-400 rounded-2xl p-7 text-white shadow-lg shadow-orange-200">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -right-4 top-10 w-24 h-24 rounded-full bg-white/10" />
        <div className="relative">
          <p className="text-orange-100 text-sm font-medium mb-1">{greeting}</p>
          <h1 className="text-2xl font-bold mb-1">
            {user?.name || user?.email || "User"} 👋
          </h1>
          <p className="text-orange-100 text-sm">
            Role:{" "}
            <span className="font-semibold text-white">
              {user?.roles?.[0] || "Member"}
            </span>
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            label: "Total Users",
            value: totalUsers,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            href: "/users",
          },
          {
            label: "Active Leads",
            value: "—",
            icon: Target,
            color: "text-orange-500",
            bg: "bg-orange-50",
            href: "/leads",
            note: "Module coming soon",
          },
          {
            label: "Open Tasks",
            value: "—",
            icon: CheckSquare,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            href: "/tasks",
            note: "Module coming soon",
          },
          {
            label: "Conversion Rate",
            value: "—",
            icon: TrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50",
            href: "/reports",
            note: "Reports coming soon",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group block"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon size={20} className={stat.color} />
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-300 group-hover:text-[#FF6C37] transition-colors"
              />
            </div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {stat.value}
            </h3>
            {stat.note && (
              <p className="text-[11px] text-gray-400 mt-1">{stat.note}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              href: "/users",
              icon: Users,
              title: "User Management",
              desc: "View, search, and manage team members and their roles.",
              color: "from-blue-500 to-blue-600",
              light: "bg-blue-50",
              text: "text-blue-600",
              badge: "Live",
              badgeColor: "bg-emerald-100 text-emerald-700",
            },
            {
              href: "/permissions",
              icon: CheckSquare,
              title: "Permissions",
              desc: "Grant and revoke per-user permission atoms beyond their role.",
              color: "from-[#FF6C37] to-orange-400",
              light: "bg-orange-50",
              text: "text-orange-500",
              badge: "Live",
              badgeColor: "bg-emerald-100 text-emerald-700",
            },
            {
              href: "/audit-log",
              icon: LayoutDashboard,
              title: "Audit Log",
              desc: "Append-only activity trail for all RBAC and user actions.",
              color: "from-gray-600 to-gray-700",
              light: "bg-gray-50",
              text: "text-gray-600",
              badge: "Live",
              badgeColor: "bg-emerald-100 text-emerald-700",
            },
            {
              href: "/leads",
              icon: Target,
              title: "Leads",
              desc: "Pipeline tracking for prospects. Coming soon.",
              color: "from-rose-500 to-pink-500",
              light: "bg-rose-50",
              text: "text-rose-500",
              badge: "Coming Soon",
              badgeColor: "bg-amber-100 text-amber-700",
            },
            {
              href: "/tasks",
              icon: CheckSquare,
              title: "Task Boards",
              desc: "Assign and track granular tasks per team member.",
              color: "from-emerald-500 to-teal-500",
              light: "bg-emerald-50",
              text: "text-emerald-600",
              badge: "Coming Soon",
              badgeColor: "bg-amber-100 text-amber-700",
            },
            {
              href: "/reports",
              icon: TrendingUp,
              title: "Reports",
              desc: "Analytics, exports, and visual performance dashboards.",
              color: "from-purple-500 to-violet-600",
              light: "bg-purple-50",
              text: "text-purple-600",
              badge: "Coming Soon",
              badgeColor: "bg-amber-100 text-amber-700",
            },
          ].map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 group flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl bg-linear-to-br ${mod.color} flex items-center justify-center shadow-sm`}
                >
                  <mod.icon size={20} className="text-white" />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${mod.badgeColor}`}
                >
                  {mod.badge}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#FF6C37] transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
