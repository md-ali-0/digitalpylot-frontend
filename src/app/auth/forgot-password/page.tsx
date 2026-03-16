/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { App, Form, Input } from "antd";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [forgetPassword] = useForgetPasswordMutation();
  const [showTenantField, setShowTenantField] = useState(false);

  const handleEmailSubmit = async (values: {
    email: string;
    tenantId?: string;
  }) => {
    setLoading(true);
    try {
      const res: any = await forgetPassword({
        email: values.email,
        tenantId: values.tenantId?.trim() || undefined,
      });
      if (res.data?.success) {
        message.success(
          "If your email exists, you will receive a reset link shortly.",
        );
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        const errData = res?.error?.data;
        const code = errData?.error?.code || errData?.code;
        const errMsg =
          errData?.error?.message ||
          errData?.message ||
          "Failed to send reset link.";
        if (code === "auth.multiple_accounts") {
          message.warning(
            "Multiple accounts found for this email. Please enter your network subdomain below.",
          );
          setShowTenantField(true);
        } else {
          message.error(errMsg);
        }
      }
    } catch (error: any) {
      const errData = error?.data;
      const code = errData?.error?.code || errData?.code;
      if (code === "auth.multiple_accounts") {
        message.warning(
          "Multiple accounts found for this email. Please enter your network subdomain below.",
        );
        setShowTenantField(true);
      } else if (errData?.details?.length > 0) {
        message.error(errData.details[0]?.message);
      } else if (errData?.error?.message) {
        message.error(errData.error.message);
      } else {
        message.error("Failed to send verification link");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
        <p className="text-gray-500 text-sm">Enter your email to receive a password reset link</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleEmailSubmit}
        requiredMark={false}
        className="space-y-5"
      >
        <Form.Item
          name="email"
          label={<span className="font-medium text-gray-700">Email Address</span>}
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
          className="mb-5!"
        >
          <Input
            prefix={<Mail size={16} className="text-gray-400 mr-1" />}
            placeholder="name@company.com"
            className="h-12! rounded-xl! border-gray-200 hover:border-gray-300 focus:border-[#FF6C37] focus:ring-4 focus:ring-orange-500/10 transition-all px-4 text-gray-900"
          />
        </Form.Item>

        {showTenantField && (
          <Form.Item
            name="tenantId"
            label={<span className="font-medium text-gray-700">Network / Subdomain</span>}
            help="Enter your network subdomain (e.g. default, acme) if you have multiple accounts"
            className="mb-5!"
          >
            <Input
              placeholder="e.g. default"
              className="h-12! rounded-xl! border-gray-200 hover:border-gray-300 focus:border-[#FF6C37] transition-all px-4"
            />
          </Form.Item>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#FF6C37] text-white rounded-xl text-[15px] font-semibold shadow-[0_6px_20px_rgba(255,108,55,0.3)] hover:bg-[#F25A24] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </button>
      </Form>

      <div className="mt-8 text-center text-[15px] text-gray-500">
        Remember your password?{" "}
        <Link href="/auth/signin" className="text-gray-900 font-semibold hover:text-[#FF6C37] transition-colors ml-1">
          Sign In
        </Link>
      </div>
    </div>
  );
}
