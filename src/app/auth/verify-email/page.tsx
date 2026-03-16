"use client";

import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import { App, Button, Form, Input, Result, Spin } from "antd";
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

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendVerificationEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [errorMessage, setErrorMessage] = useState("Verification failed");
  const [showResend, setShowResend] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState<string>("");
  const [showTenantField, setShowTenantField] = useState(false);

  // Use a ref to prevent double execution in React Strict Mode
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationStatus("error");
        setErrorMessage("Invalid or missing verification token.");
        setShowResend(true);
        return;
      }

      // Try extraction of email from token anyway
      try {
        const decoded: any = jwtDecode(token);
        if (decoded?.email) {
          setPrefilledEmail(decoded.email);
        }
      } catch (e) {
        // Ignore decode errors
      }

      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        const res: any = await verifyEmail(token);

        if (res?.data?.success || res?.data?.message) {
          setVerificationStatus("success");
          message.success("Email verified successfully!");
          setTimeout(() => {
            router.push("/auth/signin");
          }, 3000);
        } else {
          setVerificationStatus("error");
          setErrorMessage(
            res?.error?.data?.message ||
              res?.error?.data?.error?.message ||
              "Verification failed. Token may be expired.",
          );
          setShowResend(true);
        }
      } catch (error: any) {
        console.error("Verification error details:", error);
        let msg = "An unexpected error occurred.";
        if (error?.status === "FETCH_ERROR") {
          msg = "Network error. Please check your connection or CORS settings.";
        } else if (error?.data?.message) {
          msg = error.data.message;
        }
        setVerificationStatus("error");
        setErrorMessage(msg);
        setShowResend(true);
      }
    };

    verifyToken();
  }, [token, verifyEmail, router, message]);

  const handleResend = async (values: { email: string; tenantId?: string }) => {
    try {
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
          message.warning(
            "Multiple accounts found. Enter your network subdomain and try again.",
          );
          setShowTenantField(true);
        } else {
          message.error(
            errData?.error?.message ||
              errData?.message ||
              "Failed to resend email.",
          );
        }
      }
    } catch (error: any) {
      const code = error?.data?.error?.code || error?.data?.code;
      if (code === "auth.multiple_accounts") {
        message.warning(
          "Multiple accounts found. Enter your network subdomain and try again.",
        );
        setShowTenantField(true);
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in 0">
      {verificationStatus === "verifying" && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Spin size="large" />
          <p className="text-slate-500 font-medium animate-pulse">
            Verifying your email...
          </p>
        </div>
      )}

      {verificationStatus === "success" && (
        <Result
          icon={<CheckCircle className="text-emerald-500 w-16 h-16 mx-auto" />}
          title={
            <span className="text-2xl font-bold text-slate-900">Verified!</span>
          }
          subTitle="Your email address has been successfully verified. You can now access your account."
          extra={[
            <Link key="login" href="/auth/signin">
              <Button
                type="primary"
                size="large"
                className="bg-primary h-11 px-8 rounded-xl font-bold border-none shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Go to Login
              </Button>
            </Link>,
          ]}
        />
      )}

      {verificationStatus === "error" && (
        <div className="text-center">
          <Result
            icon={<XCircle className="text-rose-500 w-16 h-16 mx-auto" />}
            title={
              <span className="text-2xl font-bold text-slate-900">
                Verification Failed
              </span>
            }
            subTitle={<span className="text-slate-500">{errorMessage}</span>}
          />

          {showResend && (
            <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-slate-700 mb-4">
                Resend Verification Email
              </h3>
              <Form
                onFinish={handleResend}
                layout="vertical"
                initialValues={{ email: prefilledEmail }}
                key={prefilledEmail} // Force re-render when email loads
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<Mail className="w-4 h-4 text-slate-400" />}
                    placeholder="Enter your email address"
                    size="large"
                    readOnly
                    className="rounded-lg"
                  />
                </Form.Item>
                {showTenantField && (
                  <Form.Item name="tenantId" label="Network / Subdomain">
                    <Input
                      placeholder="e.g. default"
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isResending}
                  block
                  size="large"
                  className="bg-slate-800 hover:bg-slate-700 h-11 rounded-lg font-medium"
                >
                  Resend Email
                </Button>
              </Form>
            </div>
          )}

          <div className="mt-6">
            <Link href="/auth/signin">
              <Button
                type="text"
                className="text-slate-500 hover:text-slate-700"
              >
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
