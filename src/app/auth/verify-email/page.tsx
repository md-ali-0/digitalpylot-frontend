"use client";

import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import { App, Form, Input, Spin } from "antd";
import { jwtDecode } from "jwt-decode";
import { CheckCircle, Mail, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { message } = App.useApp();

  const [verifyEmail] = useVerifyEmailMutation();
  const [resendVerificationEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [errorMessage, setErrorMessage] = useState("Verification failed");
  const [showResend, setShowResend] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState<string>("");
  const [showTenantField, setShowTenantField] = useState(false);
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationStatus("error");
        setErrorMessage("Invalid or missing verification token.");
        setShowResend(true);
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(token);
        if (decoded?.email) setPrefilledEmail(decoded.email);
      } catch {
        // Ignore decode errors
      }

      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await verifyEmail(token);
        if (res?.data?.success || res?.data?.message) {
          setVerificationStatus("success");
          message.success("Email verified successfully!");
          setTimeout(() => router.push("/auth/signin"), 3000);
        } else {
          setVerificationStatus("error");
          setErrorMessage(
            res?.error?.data?.message ||
              res?.error?.data?.error?.message ||
              "Verification failed. Token may be expired.",
          );
          setShowResend(true);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setVerificationStatus("error");
        setErrorMessage(error?.data?.message || "An unexpected error occurred.");
        setShowResend(true);
      }
    };
    verifyToken();
  }, [token, verifyEmail, router, message]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResend = async (values: { email: string; tenantId?: string }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await resendVerificationEmail({
        email: values.email,
        tenantId: values.tenantId?.trim() || undefined,
      });
      if (res?.data?.success || res?.data?.message) {
        message.success("Verification email sent! Please check your inbox.");
        setShowResend(false);
      } else {
        const errData = res?.error?.data;
        const code = errData?.error?.code || errData?.code;
        if (code === "auth.multiple_accounts") {
          message.warning("Multiple accounts found. Enter your network subdomain.");
          setShowTenantField(true);
        } else {
          message.error(errData?.error?.message || errData?.message || "Failed to resend email.");
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const code = error?.data?.error?.code || error?.data?.code;
      if (code === "auth.multiple_accounts") {
        setShowTenantField(true);
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full">
      {verificationStatus === "verifying" && (
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <Spin size="large" />
          <p className="text-gray-500 font-medium animate-pulse">Verifying your email...</p>
        </div>
      )}

      {verificationStatus === "success" && (
        <div className="flex flex-col items-center text-center py-8 space-y-5">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-500 w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verified!</h1>
            <p className="text-gray-500 text-sm">
              Your email address has been successfully verified. Redirecting to login...
            </p>
          </div>
          <Link
            href="/auth/signin"
            className="w-full h-12 bg-[#FF6C37] text-white rounded-xl text-[15px] font-semibold shadow-[0_6px_20px_rgba(255,108,55,0.3)] hover:bg-[#F25A24] transition-all flex items-center justify-center"
          >
            Go to Login
          </Link>
        </div>
      )}

      {verificationStatus === "error" && (
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <XCircle className="text-red-500 w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-500 text-sm">{errorMessage}</p>
          </div>

          {showResend && (
            <div className="w-full p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left">
              <h3 className="font-semibold text-gray-800 mb-4">Resend Verification Email</h3>
              <Form
                onFinish={handleResend}
                layout="vertical"
                initialValues={{ email: prefilledEmail }}
                key={prefilledEmail}
              >
                <Form.Item
                  name="email"
                  label={<span className="font-medium text-gray-700">Email Address</span>}
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                  className="mb-4!"
                >
                  <Input
                    prefix={<Mail className="w-4 h-4 text-gray-400 mr-1" />}
                    placeholder="Enter your email address"
                    readOnly
                    className="h-12! rounded-xl! border-gray-200"
                  />
                </Form.Item>
                {showTenantField && (
                  <Form.Item
                    name="tenantId"
                    label={<span className="font-medium text-gray-700">Network / Subdomain</span>}
                    className="mb-4!"
                  >
                    <Input
                      placeholder="e.g. default"
                      className="h-12! rounded-xl! border-gray-200 hover:border-gray-300"
                    />
                  </Form.Item>
                )}
                <button
                  type="submit"
                  disabled={isResending}
                  className="w-full h-12 bg-[#FF6C37] text-white rounded-xl text-[15px] font-semibold shadow-[0_6px_20px_rgba(255,108,55,0.3)] hover:bg-[#F25A24] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isResending ? (
                    <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Resend Email"
                  )}
                </button>
              </Form>
            </div>
          )}

          <div className="text-[15px] text-gray-500">
            <Link href="/auth/signin" className="text-gray-900 font-semibold hover:text-[#FF6C37] transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
