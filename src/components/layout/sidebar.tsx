"use client";

import LogoSvg from "@/components/shared/logo";
import { cn } from "@/utils/cn";
import {
  BarChart3,
  CheckSquare,
  ChevronRight,
  History,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

interface MenuItem {
  label: string;
  icon: any;
  href: string;
  permission: string;
  exact?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        permission: "dashboard:read",
        exact: true,
      },
    ],
  },
  {
    title: "CRM",
    items: [
      {
        label: "Users",
        icon: Users,
        href: "/users",
        permission: "users:read",
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
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Permissions",
        icon: ShieldCheck,
        href: "/permissions",
        permission: "permissions:manage",
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
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const permissions: string[] = user?.permissions || [];

  const canSee = (permission: string) =>
    permissions.includes(permission) || permissions.includes("*");

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-50">
        <Link href="/" className="flex items-center">
          <LogoSvg />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {MENU_SECTIONS.map((section) => {
          const visibleItems = section.items.filter((item) => canSee(item.permission));
          if (visibleItems.length === 0) return null;
          return (
            <div key={section.title}>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3 mb-1.5">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const active = isActive(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        active
                          ? "bg-orange-50 text-[#FF6C37]"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon
                        size={18}
                        className={cn(
                          "shrink-0 transition-colors",
                          active ? "text-[#FF6C37]" : "text-gray-400 group-hover:text-gray-700"
                        )}
                      />
                      <span className="text-sm font-medium flex-1">{item.label}</span>
                      {active && (
                        <ChevronRight
                          size={14}
                          className="text-[#FF6C37] opacity-60"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-gray-50">
        <Link
          href="/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#FF6C37] to-orange-400 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm shadow-orange-200">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-gray-400 truncate capitalize">
              {user?.roles?.[0] || "Member"}
            </p>
          </div>
          <Settings
            size={14}
            className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0"
          />
        </Link>
      </div>
    </aside>
  );
}
