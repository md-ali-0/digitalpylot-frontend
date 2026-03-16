/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { App, Button, Form, Input } from "antd";
import { Mail, Send } from "lucide-react";
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
    <div className="w-full max-w-sm mx-auto space-y-8 animate-fade-in">
      <div className="space-y-1 mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Forgot Password
        </h2>
        <p className="text-slate-400 text-sm font-medium">
          Enter your email to receive a password reset link
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleEmailSubmit}
        requiredMark={false}
        className="space-y-3"
      >
        <Form.Item
          name="email"
          className="mb-3"
          label={
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </span>
          }
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            prefix={<Mail size={18} className="text-slate-300 mr-2" />}
            placeholder="name@company.com"
            className="h-11 rounded-xl border-slate-200 hover:border-primary focus:border-primary transition-all text-base"
          />
        </Form.Item>

        {(showTenantField || form.getFieldValue("tenantId")) && (
          <Form.Item
            name="tenantId"
            className="mb-3"
            label={
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Network / Subdomain
              </span>
            }
            help="Enter your network subdomain (e.g. default, acme) if you have multiple accounts"
          >
            <Input
              placeholder="e.g. default"
              className="h-11 rounded-xl border-slate-200 hover:border-primary focus:border-primary transition-all text-base"
            />
          </Form.Item>
        )}

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full h-12 bg-primary hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-primary/10 border-none mt-2 flex items-center justify-center gap-2"
          icon={!loading && <Send size={18} />}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </Form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100"></div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 font-medium">
        Remember your password?{" "}
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
