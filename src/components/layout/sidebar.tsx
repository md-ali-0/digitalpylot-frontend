"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  CheckSquare, 
  BarChart3, 
  History, 
  Settings,
  ShieldCheck
} from "lucide-react";
import LogoSvg from "@/components/shared/logo";
import { cn } from "@/utils/cn";

const MENU_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    permission: "dashboard:read",
  },
  {
    label: "Users",
    icon: Users,
    href: "/users",
    permission: "users:read",
  },
  {
    label: "Permissions",
    icon: ShieldCheck,
    href: "/permissions",
    permission: "permissions:manage",
  },
  {
    label: "Leads",
    icon: Target,
    href: "/leads",
    permission: "leads:read",
  },
  {
    label: "Tasks",
    icon: CheckSquare,
    href: "/tasks",
    permission: "tasks:read",
  },
  {
    label: "Reports",
    icon: BarChart3,
    href: "/reports",
    permission: "reports:read",
  },
  {
    label: "Audit Log",
    icon: History,
    href: "/audit-log",
    permission: "audit:read",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    permission: "settings:read",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const permissions = user?.permissions || [];

  // Filter menu items based on user permissions
  const filteredMenu = MENU_ITEMS.filter(
    (item) => permissions.includes(item.permission) || permissions.includes("*"),
  );

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center">
          <LogoSvg />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pt-4">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-orange-50 text-[#FF6C37]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-colors",
                isActive ? "text-[#FF6C37]" : "text-gray-400 group-hover:text-gray-900"
              )} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF6C37]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FF6C37]/10 flex items-center justify-center text-[#FF6C37] font-bold">
            {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "User"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.roles?.[0] || "Member"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
