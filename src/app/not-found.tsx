"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
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
      </div>
    </div>
  );
}
