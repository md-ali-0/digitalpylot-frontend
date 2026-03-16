"use client";

import { ReloadOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Space } from "antd";

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onClear?: () => void;
}

export default function ErrorDisplay({
  title = "Error Loading Data",
  message,
  onRetry,
  onClear,
}: ErrorDisplayProps) {
  return (
    <Card>
      <Alert
        message={title}
        description={
          <div>
            <p>{message}</p>
            <div style={{ marginTop: 8 }}>
              <Space>
                {onRetry && (
                  <Button
                    size="small"
                    icon={<ReloadOutlined />}
                    onClick={onRetry}
                  >
                    Retry
                  </Button>
                )}
                {onClear && (
                  <Button size="small" onClick={onClear}>
                    Clear
                  </Button>
                )}
              </Space>
            </div>
          </div>
        }
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    </Card>
  );
}
