/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { App, Form, Input } from "antd";
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
        message.success("Password changed successfully. Redirecting to login...");
        router.push("/auth/signin");
      } else {
        message.error(res?.error?.data?.error?.message || "Failed to reset password");
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
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
        <p className="text-gray-500 text-sm">Enter your new password below</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="space-y-5"
      >
        <Form.Item
          name="newPassword"
          label={<span className="font-medium text-gray-700">New Password</span>}
          rules={[
            { required: true, message: "Please enter a new password" },
            { min: 8, message: "Password must be at least 8 characters long!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
              message: "Must contain uppercase, lowercase, number, and special character",
            },
          ]}
          className="mb-5!"
        >
          <Input.Password
            placeholder="New Password"
            className="h-12! rounded-xl! border-gray-200 hover:border-gray-300 focus:border-[#FF6C37] transition-all px-4 text-gray-900"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<span className="font-medium text-gray-700">Confirm Password</span>}
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
          className="mb-5!"
        >
          <Input.Password
            placeholder="Confirm Password"
            className="h-12! rounded-xl! border-gray-200 hover:border-gray-300 focus:border-[#FF6C37] transition-all px-4 text-gray-900"
          />
        </Form.Item>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#FF6C37] text-white rounded-xl text-[15px] font-semibold shadow-[0_6px_20px_rgba(255,108,55,0.3)] hover:bg-[#F25A24] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Reset Password"
          )}
        </button>
      </Form>

      <div className="mt-8 text-center text-[15px] text-gray-500">
        Back to login?{" "}
        <Link href="/auth/signin" className="text-gray-900 font-semibold hover:text-[#FF6C37] transition-colors ml-1">
          Sign In
        </Link>
      </div>
    </div>
  );
}
