"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { App } from "antd";
import { Bell, LogOut, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const { modal, message } = App.useApp();

  const handleLogout = () => {
    modal.confirm({
      title: "Logout",
      content: "Are you sure you want to log out?",
      onOk: () => {
        dispatch(logout());
        message.success("Logged out successfully");
        window.location.href = "/api/auth/signout";
      },
      okButtonProps: { className: "bg-[#FF6C37]" },
    });
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="relative w-80 group">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF6C37] transition-colors"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-50 border border-transparent rounded-xl py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-300 focus:border-orange-200 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 bg-gray-100 rounded px-1.5 py-0.5 font-mono hidden group-focus-within:hidden sm:block">
          ⌘K
        </kbd>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6C37] rounded-full border-2 border-white" />
        </button>

        <div className="w-px h-5 bg-gray-100 mx-1" />

        {/* User Info */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-[#FF6C37] to-orange-400 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-orange-200 shrink-0">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-tight truncate max-w-[120px]">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-gray-400 capitalize leading-tight">
              {user?.roles?.[0] || "Member"}
            </p>
          </div>
        </div>

        <div className="w-px h-5 bg-gray-100 mx-1" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
