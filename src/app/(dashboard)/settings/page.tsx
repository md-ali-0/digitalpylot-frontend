"use client";

import { cn } from "@/utils/cn";
import { Bell, ChevronRight, Palette, Shield, User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const TABS = [
  { key: "profile", label: "Profile", icon: User },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);

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

              {/* Profile Fields */}
              <div className="p-6 space-y-4">
                {[
                  { label: "Full Name", value: user?.name || "—" },
                  { label: "Email Address", value: user?.email || "—" },
                  { label: "Role", value: user?.roles?.[0] || "Member" },
                  { label: "Status", value: user?.status || "—" },
                ].map((field) => (
                  <div key={field.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-400 font-medium w-36">{field.label}</span>
                    <span className="text-sm font-semibold text-gray-900 flex-1 text-right capitalize">
                      {field.value}
                    </span>
                  </div>
                ))}

                <div className="pt-2">
                  <p className="text-xs text-gray-300 font-medium italic">
                    Profile editing will be available in a future update.
                  </p>
                </div>
              </div>
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
