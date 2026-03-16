/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMeta } from "@/types";
import { Table as AntdTable } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection as AntdTableRowSelection } from "antd/es/table/interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export interface BulkAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  confirmMessage?: string;
}

interface TableProps<TData> {
  data: TData[];
  meta: TMeta | undefined;
  columns: ColumnsType<TData>;
  isLoading?: boolean;
  isFetching?: boolean;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  setSortBy: (field: string) => void;
  setSortOrder: (order: string) => void;
  setStatus?: (value: string | undefined) => void;
  setMediaType?: (value: string | undefined) => void;
  showSizeChanger?: boolean;
  urlParamsUpdate?: boolean;
  isSerial?: boolean;
  summary?: any;
  expandable?: any;
  // Bulk actions props
  enableBulkActions?: boolean;
  selectedRowKeys?: string[];
  onSelectionChange?: (selectedKeys: string[]) => void;
}

export default function Table<TData extends { id: string }>({
  data,
  meta,
  columns,
  isLoading,
  isFetching,
  page,
  setPage,
  limit,
  setLimit,
  setSortBy,
  setStatus,
  setMediaType,
  setSortOrder,
  showSizeChanger = true,
  urlParamsUpdate = true,
  isSerial = true,
  summary,
  expandable,
  enableBulkActions = false,
  selectedRowKeys: externalSelectedKeys,
  onSelectionChange,
}: TableProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(
    [],
  );

  // Use external or internal selected keys
  const selectedRowKeys = externalSelectedKeys ?? internalSelectedKeys;
  const setSelectedRowKeys = onSelectionChange ?? setInternalSelectedKeys;

  const updateUrlParams = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage > 0) params.set("page", newPage.toString());
    else params.delete("page");

    if (newLimit > 0) params.set("limit", newLimit.toString());
    else params.delete("limit");

    router.push(`?${params.toString()}`);
  };

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    const newPage = pagination.current;
    const newLimit = pagination.pageSize;

    setPage(newPage);
    setLimit(newLimit);
    if (urlParamsUpdate) {
      updateUrlParams(newPage, newLimit);
    }

    if (sorter.field && sorter.order) {
      setSortBy(sorter.field);
      setSortOrder(sorter.order === "ascend" ? "asc" : "desc");
    } else {
      setSortBy("createdAt");
      setSortOrder("desc");
    }

    if (setStatus) {
      if (filters.status) setStatus(filters.status[0]);
      else setStatus(undefined);
    }
    if (setMediaType) {
      if (filters.media_type) setMediaType(filters.media_type[0]);
      else setMediaType(undefined);
    }
  }

  // Row selection configuration
  const rowSelection: AntdTableRowSelection<TData> | undefined =
    enableBulkActions
      ? {
          selectedRowKeys,
          onChange: (selectedKeys: React.Key[]) => {
            setSelectedRowKeys(selectedKeys as string[]);
          },
        }
      : undefined;

  // Inject serial number column
  const serialColumn: ColumnsType<TData>[number] = {
    title: "SL",
    key: "serial",
    width: 70,
    align: "center",
    render: (_: any, __: TData, index: number) => {
      const serial = (page - 1) * limit + (index + 1);
      return (
        <span style={{ fontWeight: 500, textAlign: "center" }}>{serial}</span>
      );
    },
  };
  const finalColumns = isSerial ? [serialColumn, ...columns] : columns;

  return (
    <AntdTable
      dataSource={data}
      columns={finalColumns}
      loading={isLoading || isFetching}
      rowKey="id"
      rowSelection={rowSelection}
      expandable={expandable || false}
      pagination={{
        current: page,
        pageSize: limit,
        total: meta?.total || 0,
        showSizeChanger: showSizeChanger,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      onChange={handleTableChange}
      // scroll={{ x: "max-content" }}
      summary={summary}
    />
  );
}
