"use client";

import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useRouter } from "next/navigation";

interface BreadcrumbNavProps {
  items: ItemType[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const finalItems: ItemType[] = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    ...items,
  ];

  const router = useRouter();

  return (
    <Card
      className="mb-4"
      bodyStyle={{
        padding: "10px",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Breadcrumb */}
        <Breadcrumb
          items={finalItems}
          className="text-gray-600 [&_.ant-breadcrumb-link]:text-sm"
        />

        {/* Back Button */}
        <Button
          icon={<ArrowLeftOutlined className="text-white" />}
          type="primary"
          ghost
          onClick={() => router.back()}
        >
          <span className="hidden sm:inline text-white">Go Back</span>
        </Button>
      </div>
    </Card>
  );
}
