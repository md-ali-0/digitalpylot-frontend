"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { App } from "antd";

export default function Topbar() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);
  const { modal, message } = App.useApp();

  const handleLogout = () => {
    modal.confirm({
      title: 'Logout',
      content: 'Are you sure you want to log out?',
      onOk: () => {
        dispatch(logout());
        message.success("Logged out successfully");
        window.location.href = "/api/auth/signout";
      },
      okButtonProps: { className: 'bg-[#FF6C37]' }
    });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF6C37] transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#FF6C37]/10 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 hover:bg-gray-50 rounded-xl text-gray-500 relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#FF6C37] rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-gray-100 mx-2" />

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-xl transition-all font-medium group"
        >
          <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
