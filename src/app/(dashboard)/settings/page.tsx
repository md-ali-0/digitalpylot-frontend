"use client";

import { cn } from "@/utils/cn";
import { Bell, ChevronRight, Palette, Shield, User as UserIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { message } from "antd";

const TABS = [
  { key: "profile", label: "Profile", icon: UserIcon },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
  { key: "appearance", label: "Appearance", icon: Palette },
];

function ComingSoonBlock({ label }: { label: string }) {
  return (
    <div className="py-16 flex flex-col items-center gap-4 text-center">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
        <Shield size={24} className="text-gray-200" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{label} — Coming Soon</p>
        <p className="text-gray-400 text-sm mt-1">This section is under active development.</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useSelector((state: any) => state.auth);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "", // Read-only for now as per backend logic
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        id: user.id,
        data: { name: formData.name }
      }).unwrap();
      message.success("Profile updated successfully");
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to update profile");
    }
  };

  const initials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-400 text-sm mt-0.5">
          Manage your profile, preferences, and account security.
        </p>
      </div>

      <div className="flex gap-6 items-start">
        {/* Sidebar Nav */}
        <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-2 space-y-0.5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                activeTab === tab.key
                  ? "bg-orange-50 text-[#FF6C37]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="flex items-center gap-2.5">
                <tab.icon size={16} className={activeTab === tab.key ? "text-[#FF6C37]" : "text-gray-400"} />
                {tab.label}
              </span>
              {activeTab === tab.key && (
                <ChevronRight size={14} className="text-[#FF6C37] opacity-60" />
              )}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {activeTab === "profile" && (
            <div>
              {/* Profile Header */}
              <div className="px-6 pt-6 pb-5 border-b border-gray-50 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#FF6C37] to-orange-400 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-orange-200">
                  {initials}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{user?.name || "User"}</h2>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 capitalize">
                    {user?.roles?.[0] || "Member"}
                  </span>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      className="w-full h-11 px-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-[#FF6C37] focus:ring-2 focus:ring-orange-100 outline-hidden transition-all text-sm font-medium"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      disabled
                      className="w-full h-11 px-4 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-400 text-sm font-medium cursor-not-allowed"
                      value={formData.email}
                    />
                    <p className="text-[10px] text-gray-400 italic">Email cannot be changed for security reasons.</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end border-t border-gray-50">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="h-11 px-8 rounded-xl bg-[#FF6C37] hover:bg-[#e65b2a] disabled:bg-orange-300 text-white font-bold text-sm shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2"
                  >
                    {isUpdating && <Loader2 size={16} className="animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <ComingSoonBlock label="Notification Preferences" />
          )}
          {activeTab === "security" && (
            <ComingSoonBlock label="Security Settings (2FA, Password)" />
          )}
          {activeTab === "appearance" && (
            <ComingSoonBlock label="Appearance & Theme" />
          )}
        </div>
      </div>
    </div>
  );
}
