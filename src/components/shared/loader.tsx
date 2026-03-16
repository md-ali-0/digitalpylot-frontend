"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
      <div className="text-center">
        <Spin indicator={antIcon} />
        <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
