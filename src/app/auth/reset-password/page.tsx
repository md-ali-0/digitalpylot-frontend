/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { App, Button, Form, Input } from "antd";
import { Key, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [form] = Form.useForm();
  const [resetPassword] = useResetPasswordMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      message.error("Invalid or missing token");
      router.push("/auth/forgot-password");
    }
  }, [token, router]);

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      return message.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res: any = await resetPassword({
        token,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      if (res?.data?.success) {
        message.success(
          "Password changed successfully. Redirecting to login...",
        );
        router.push("/auth/signin");
      } else {
        message.error(
          res?.error?.data?.error?.message || "Failed to reset password",
        );
      }
    } catch (error: any) {
      if (error?.data?.details?.length > 0) {
        message.error(error?.data?.details[0]?.message);
      } else if (error?.data?.error?.message) {
        message.error(error?.data?.error?.message);
      } else {
        message.error("Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-8 animate-fade-in">
      <div className="space-y-1 mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Reset Password
        </h2>
        <p className="text-slate-400 text-sm font-medium">
          Enter your new password below
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="space-y-3"
      >
        <Form.Item
          name="newPassword"
          label={
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              New Password
            </span>
          }
          rules={[
            { required: true, message: "Please enter a new password" },
            {
              min: 8,
              message: "Password must be at least 8 characters long!",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
              message:
                "Password must contain at least one lowercase letter, uppercase letter, number, and special character!",
            },
          ]}
          className="mb-3"
        >
          <Input.Password
            prefix={<Lock size={18} className="text-slate-300 mr-2" />}
            placeholder="New Password"
            className="h-11 rounded-xl border-slate-200 hover:border-primary focus:border-primary transition-all text-base"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Confirm Password
            </span>
          }
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
          className="mb-3"
        >
          <Input.Password
            prefix={<Lock size={18} className="text-slate-300 mr-2" />}
            placeholder="Confirm Password"
            className="h-11 rounded-xl border-slate-200 hover:border-primary focus:border-primary transition-all text-base"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full h-12 bg-primary hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-primary/10 border-none mt-2 flex items-center justify-center gap-2"
          icon={!loading && <Key size={18} />}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100"></div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 font-medium">
        Back to login?{" "}
        <Link
          href="/auth/signin"
          className="text-primary font-bold hover:opacity-80 transition-opacity"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
