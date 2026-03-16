"use client";

import { HomeOutlined, LockOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-block p-4 rounded-full bg-emerald-100 mb-6">
          <LockOutlined className="text-4xl text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          Sorry, you don&apos;t have permission to access this page. Please
          contact your administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              size="large"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0"
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button size="large">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
