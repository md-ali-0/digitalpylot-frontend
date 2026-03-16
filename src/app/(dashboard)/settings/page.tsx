"use client";

import { Settings, User, Bell, Shield, Palette } from "lucide-react";
import { Tabs } from "antd";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your personal profile, notification preferences, and security.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden p-2">
        <Tabs
          className="settings-tabs px-6 py-4"
          items={[
            {
              key: "profile",
              label: (
                <div className="flex items-center gap-2 px-2 py-1">
                  <User size={18} />
                  <span>Profile</span>
                </div>
              ),
              children: (
                <div className="py-12 flex flex-col items-center text-center space-y-2">
                   <div className="w-24 h-24 bg-gray-50 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                     <User size={40} />
                   </div>
                   <h4 className="font-bold text-gray-900">Profile Settings Under Active Development</h4>
                   <p className="text-gray-500 text-sm max-w-sm font-medium leading-relaxed">Soon you'll be able to manage your avatar, personal info, and professional details.</p>
                </div>
              ),
            },
            {
              key: "notifications",
              label: (
                <div className="flex items-center gap-2 px-2 py-1">
                  <Bell size={18} />
                  <span>Notifications</span>
                </div>
              ),
              children: <div className="p-12 text-center text-gray-400 font-medium italic">Notification preferences coming soon.</div>,
            },
            {
              key: "security",
              label: (
                <div className="flex items-center gap-2 px-2 py-1">
                  <Shield size={18} />
                  <span>Security</span>
                </div>
              ),
              children: <div className="p-12 text-center text-gray-400 font-medium italic">Security settings (2FA, Password) coming soon.</div>,
            },
            {
              key: "appearance",
              label: (
                <div className="flex items-center gap-2 px-2 py-1">
                  <Palette size={18} />
                  <span>Appearance</span>
                </div>
              ),
              children: <div className="p-12 text-center text-gray-400 font-medium italic">Theme and UI settings coming soon.</div>,
            },
          ]}
        />
      </div>

      <style jsx global>{`
        .settings-tabs .ant-tabs-nav-list {
          gap: 12px !important;
        }
        .settings-tabs .ant-tabs-tab {
          margin: 0 !important;
          padding: 8px 0 !important;
          border-radius: 12px !important;
          transition: all 0.2s !important;
        }
        .settings-tabs .ant-tabs-tab:hover {
          color: #FF6C37 !important;
          background: #fff7f2 !important;
        }
        .settings-tabs .ant-tabs-tab-active {
          color: #FF6C37 !important;
        }
        .settings-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #FF6C37 !important;
        }
        .settings-tabs .ant-tabs-ink-bar {
          background: #FF6C37 !important;
          height: 3px !important;
          border-radius: 3px 3px 0 0 !important;
        }
      `}</style>
    </div>
  );
}
