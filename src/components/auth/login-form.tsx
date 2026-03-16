"use client";

import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { signin } from "@/service/auth";
import { App, Form, Input } from "antd";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [localLoading, setLocalLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLocalLoading(true);
    try {
      const response = await signin({
        email: values.email,
        password: values.password,
      });

      if (response?.success) {
        dispatch(login(response.data));
        message.success("Welcome back! Login successful.");
        router.replace("/");
      } else {
        message.error(response?.message || "Login failed");
      }
    } catch {
      message.error("Login failed");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="auth-form-card">
      <div className="auth-form-card__header">
        <span className="auth-form-card__eyebrow">Welcome back</span>
        <h1 className="auth-form-card__title">Sign in to your workspace</h1>
        <p className="auth-form-card__description">
          Use your email and password to continue into the permission-driven
          dashboard.
        </p>
      </div>

      <Form
        form={loginForm}
        layout="vertical"
        onFinish={handleLogin}
        requiredMark={false}
        className="space-y-4"
      >
        <Form.Item
          name="email"
          className="mb-4"
          label={<span className="auth-form-card__label">Email address</span>}
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            prefix={<Mail size={18} className="auth-form-card__icon" />}
            placeholder="name@company.com"
            className="auth-form-card__input"
          />
        </Form.Item>

        <Form.Item
          name="password"
          className="mb-3"
          label={<span className="auth-form-card__label">Password</span>}
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            prefix={<Lock size={18} className="auth-form-card__icon" />}
            placeholder="Enter your password"
            className="auth-form-card__input"
          />
        </Form.Item>

        <div className="auth-form-card__meta">
          <p>Access token refresh and secure cookie session enabled.</p>
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </div>

        <button
          type="submit"
          disabled={localLoading}
          className="auth-form-card__submit group"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {localLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </div>
          <div className="auth-form-card__submit-glow"></div>
        </button>
      </Form>

      <div className="auth-form-card__footer">
        <div>
          <span>Need verification?</span>
          <Link href="/auth/verify-email">Verify email</Link>
        </div>
        <div>
          <span>Secure reset flow</span>
          <Link href="/auth/forgot-password">Open recovery</Link>
        </div>
      </div>
    </div>
  );
}
