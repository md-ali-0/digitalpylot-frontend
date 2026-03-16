"use client";

import { login } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { signin } from "@/service/auth";
import { App, Form, Input } from "antd";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [localLoading, setLocalLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-gray-500 text-sm">Enter your details to continue</p>
      </div>

      <Form
        form={loginForm}
        layout="vertical"
        onFinish={handleLogin}
        requiredMark={false}
        className="space-y-5"
      >
        <Form.Item
          name="email"
          label={<span className="font-medium text-gray-700">Email</span>}
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
          className="mb-5!"
        >
          <Input
            placeholder="example@email.com"
            className="h-12! rounded-xl! border-gray-200 hover:border-gray-300 focus:border-[#FF6C37] focus:ring-4 focus:ring-orange-500/10 transition-all px-4 text-gray-900"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="font-medium text-gray-700">Password</span>}
          rules={[{ required: true, message: "Password is required" }]}
          className="mb-5!"
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-12! rounded-xl! border-gray-200 hover:border-gray-300 focus:border-[#FF6C37] focus:ring-4 focus:ring-orange-500/10 transition-all px-4 text-gray-900"
            iconRender={(visible) => (visible ? <Eye size={18} className="text-gray-400" /> : <EyeOff size={18} className="text-gray-400" />)}
          />
        </Form.Item>

        <div className="flex items-center justify-between mb-8">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-[18px] h-[18px] rounded-[4px] border-gray-300 text-[#FF6C37] focus:ring-[#FF6C37] cursor-pointer"
            />
            <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" title="Forgot password?" className="text-sm text-[#FF6C37] font-medium hover:text-orange-600 transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={localLoading}
          className="w-full h-12 bg-[#FF6C37] text-white rounded-xl text-[15px] font-semibold shadow-[0_6px_20px_rgba(255,108,55,0.3)] hover:bg-[#F25A24] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {localLoading ? (
            <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Log in"
          )}
        </button>
      </Form>

      <div className="mt-8 text-center text-[15px] text-gray-500">
        Don't have an account? <Link href="/auth/signup" className="text-gray-900 font-semibold hover:text-[#FF6C37] transition-colors ml-1">Sign up</Link>
      </div>
    </div>
  );
}
