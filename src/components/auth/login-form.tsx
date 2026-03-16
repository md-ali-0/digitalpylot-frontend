"use client";

import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { signin } from "@/service/auth";
import { App, Form, Input } from "antd";
import { Lock, LogIn, Mail } from "lucide-react";
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
    <div className="w-full max-w-sm mx-auto space-y-8 animate-fade-in">
      <div className="space-y-1 mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Welcome Back
        </h2>
        <p className="text-slate-400 text-sm font-medium">
          Enter your credentials to access your account.
        </p>
      </div>

      <Form
        form={loginForm}
        layout="vertical"
        onFinish={handleLogin}
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

        <Form.Item
          name="password"
          className="mb-2"
          label={
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
              Password
            </span>
          }
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            prefix={<Lock size={18} className="text-slate-300 mr-2" />}
            placeholder="••••••••"
            className="h-11 rounded-xl border-slate-200 hover:border-primary focus:border-primary transition-all text-base"
          />
        </Form.Item>

        <button
          type="submit"
          disabled={localLoading}
          className="group relative w-full h-12 bg-primary hover:opacity-95 text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-primary/10 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none mt-2 cursor-pointer"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {localLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="text-white">Sign In</span>
                <LogIn
                  size={18}
                  className="transition-transform group-hover:translate-x-1 text-white"
                />
              </>
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        </button>
      </Form>
    </div>
  );
}
