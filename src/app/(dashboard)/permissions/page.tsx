"use client";

import { useEffect, useMemo, useState } from "react";
import { Shield, Save, RotateCcw, CheckCircle2, ChevronRight, Info } from "lucide-react";
import { App, Badge, Button, Spin } from "antd";
import { cn } from "@/utils/cn";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import {
  useGetUserPermissionsQuery,
  useUpdateUserPermissionsMutation,
} from "@/redux/features/rbac/rbacApi";

export default function PermissionsPage() {
  const { message } = App.useApp();
  const { data: usersResponse, isLoading: isUsersLoading } = useGetAllUsersQuery({});
  const users = usersResponse?.data || [];
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);
  const { data: permissionState, isLoading: isPermissionsLoading } = useGetUserPermissionsQuery(
    selectedUserId || "",
    { skip: !selectedUserId },
  );
  const [updateUserPermissions, { isLoading: isSaving }] = useUpdateUserPermissionsMutation();

  useEffect(() => {
    if (!selectedUserId && users.length > 0) {
      setSelectedUserId(users[0].id);
    }
  }, [selectedUserId, users]);

  useEffect(() => {
    if (permissionState) {
      setCurrentPermissions(permissionState.directPermissions);
    }
  }, [permissionState]);

  const groupedPermissions = useMemo(() => {
    const catalog = permissionState?.grantablePermissions || [];
    return catalog.reduce<Record<string, typeof catalog>>((acc, permission) => {
      if (!acc[permission.module]) {
        acc[permission.module] = [];
      }
      acc[permission.module].push(permission);
      return acc;
    }, {});
  }, [permissionState]);

  const togglePermission = (permissionName: string) => {
    setCurrentPermissions((prev) =>
      prev.includes(permissionName)
        ? prev.filter((permission) => permission !== permissionName)
        : [...prev, permissionName],
    );
  };

  const handleSave = async () => {
    if (!selectedUserId) {
      return;
    }

    try {
      await updateUserPermissions({
        userId: selectedUserId,
        permissionNames: currentPermissions,
      }).unwrap();
      message.success("Direct permission grants updated.");
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update permissions.");
    }
  };

  const handleReset = () => {
    setCurrentPermissions(permissionState?.directPermissions || []);
    message.info("Changes reset.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dynamic Permissions</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage direct permission atoms per user. Effective access combines role permissions and these overrides.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleReset}
            icon={<RotateCcw size={16} />}
            className="h-11 rounded-xl font-medium text-gray-600 border-gray-200"
          >
            Reset
          </Button>
          <Button
            type="primary"
            loading={isSaving}
            onClick={handleSave}
            icon={<Save size={18} />}
            className="bg-[#FF6C37] h-11 px-6 rounded-xl font-semibold flex items-center gap-2 border-none shadow-[0_4px_12px_rgba(255,108,55,0.2)]"
          >
            Save Grants
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
              Team Members
            </p>
            <div className="space-y-1">
              {users.map((user: any) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-all group text-left",
                    selectedUserId === user.id
                      ? "bg-orange-50 text-[#FF6C37]"
                      : "hover:bg-gray-50 text-gray-600",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FF6C37]" />
                    <div>
                      <p className="font-semibold text-sm">{user.name || "Unnamed user"}</p>
                      <p className="text-[11px] text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className={cn(
                      "transition-transform",
                      selectedUserId === user.id
                        ? "translate-x-0"
                        : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
            <Info className="text-blue-500 shrink-0" size={18} />
            <p className="text-[12px] text-blue-700 leading-relaxed font-medium">
              Grant ceiling is enforced server-side. A manager cannot grant a permission atom they do not already hold.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-[#FCFCFC]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-[#FF6C37]">
                <Shield size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {permissionState?.user.name || permissionState?.user.email || "Select a user"}
                </h3>
                <p className="text-xs text-gray-400 font-medium tracking-tight">
                  Direct grants: {currentPermissions.length} | Effective permissions:{" "}
                  {permissionState?.effectivePermissions.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">
            {isUsersLoading || isPermissionsLoading ? (
              <div className="h-[420px] flex items-center justify-center">
                <Spin size="large" />
              </div>
            ) : (
              Object.entries(groupedPermissions).map(([module, items]) => (
                <div key={module} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 capitalize">
                        {module.replace("-", " ")}
                      </h4>
                      <Badge
                        count={items.length}
                        className="site-badge-count-4"
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#64748b",
                          boxShadow: "none",
                          fontWeight: 700,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        const modulePermissions = items.map((item) => item.name);
                        const allSelected = modulePermissions.every((permission) =>
                          currentPermissions.includes(permission),
                        );

                        setCurrentPermissions((prev) => {
                          if (allSelected) {
                            return prev.filter(
                              (permission) => !modulePermissions.includes(permission),
                            );
                          }

                          return Array.from(new Set([...prev, ...modulePermissions]));
                        });
                      }}
                      className="text-[10px] font-bold text-gray-400 hover:text-[#FF6C37] uppercase tracking-widest transition-colors"
                    >
                      Toggle All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {items.map((permission) => {
                      const active = currentPermissions.includes(permission.name);
                      return (
                        <button
                          key={permission.name}
                          onClick={() => togglePermission(permission.name)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all text-sm font-semibold",
                            active
                              ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm shadow-emerald-500/5"
                              : "bg-white border-gray-100 text-gray-400 hover:border-gray-200",
                          )}
                        >
                          {active ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-100" />
                          )}
                          <span className="capitalize">{permission.atom}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
