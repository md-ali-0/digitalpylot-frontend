import { BulkAction } from "@/components/ui/data-table";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

interface BulkActionBarProps {
  selectedCount: number;
  bulkActions: BulkAction[];
  onBulkAction: (actionKey: string) => void;
  onClearSelection: () => void;
}

export default function BulkActionBar({
  selectedCount,
  bulkActions,
  onBulkAction,
  onClearSelection,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  const menuItems: MenuProps["items"] = bulkActions.map((action) => ({
    key: action.key,
    label: action.label,
    icon: action.icon,
    danger: action.danger,
    onClick: () => onBulkAction(action.key),
  }));

  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
      <Space>
        <span className="font-medium text-blue-700">
          {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
        </span>
        <Button size="small" onClick={onClearSelection}>
          Clear Selection
        </Button>
      </Space>
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <Button type="primary">Bulk Actions</Button>
      </Dropdown>
    </div>
  );
}
