"use client";

import { useCreateLeadMutation, useGetAllLeadsQuery } from "@/redux/features/leads/leadsApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Avatar, Input, Spin, Badge, Button, Modal, Form, Select, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Search, Target, Mail, Building, Phone, Plus } from "lucide-react";
import { useMemo, useState } from "react";

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-100",
  CONTACTED: "bg-amber-50 text-amber-700 border-amber-100",
  QUALIFIED: "bg-emerald-50 text-emerald-700 border-emerald-100",
  LOST: "bg-rose-50 text-rose-700 border-rose-100",
  WON: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

const LEAD_STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "LOST", "WON"];

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data, isLoading } = useGetAllLeadsQuery(
    searchTerm ? { search: searchTerm } : {}
  );
  const { data: usersData } = useGetAllUsersQuery({});
  const [createLead, { isLoading: isCreating }] = useCreateLeadMutation();

  const handleCreateLead = async (values: any) => {
    try {
      await createLead(values).unwrap();
      message.success("Lead created successfully");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to create lead");
    }
  };

  const leads = useMemo(
    () =>
      (data?.data || []).map((lead: any) => ({
        id: lead.id,
        name: `${lead.firstName || ""} ${lead.lastName || ""}`.trim() || "Unnamed Lead",
        email: lead.email || "No email",
        phone: lead.phone || "No phone",
        company: lead.company || "No company",
        status: lead.status || "NEW",
        createdAt: new Date(lead.createdAt).toLocaleDateString(),
      })),
    [data]
  );

  const columns: ColumnsType<LeadData> = [
    {
      title: "Lead Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={36}
            style={{ background: "linear-gradient(135deg, #FF6C37, #f5a76e)", fontWeight: 600 }}
          >
            {text[0]}
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 leading-tight">{text}</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-gray-400">
              <Mail size={10} />
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (text) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Building size={14} className="text-gray-300" />
          {text}
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Phone size={12} className="text-gray-300" />
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${STATUS_COLORS[status] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <span className="text-xs text-gray-400">{date}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Manage your sales pipeline and track potential customer interactions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isLoading && (
            <div className="hidden md:flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
              <Target size={15} className="text-[#FF6C37]" />
              <span className="text-sm font-bold text-gray-900">{leads.length}</span>
              <span className="text-xs text-gray-400">total leads</span>
            </div>
          )}
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
            className="h-10 px-5 rounded-xl bg-[#FF6C37] hover:bg-[#e85a29] border-none font-bold"
          >
            Add Lead
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200 text-sm"
              allowClear
            />
          </div>
        </div>

        <Modal
          title={<span className="text-lg font-bold text-gray-900">Add New Lead</span>}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
          className="rounded-2xl"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateLead}
            className="mt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">First Name</span>}
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="John" className="h-10 rounded-xl" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Last Name</span>}
              >
                <Input placeholder="Doe" className="h-10 rounded-xl" />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</span>}
              rules={[{ type: "email", message: "Invalid email" }]}
            >
              <Input placeholder="john@example.com" className="h-10 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</span>}
            >
              <Input placeholder="+1..." className="h-10 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="company"
              label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Company Name</span>}
            >
              <Input placeholder="Acme Inc." className="h-10 rounded-xl" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="status"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</span>}
                initialValue="NEW"
              >
                <Select className="h-10 w-full">
                  {LEAD_STATUSES.map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="assignedToId"
                label={<span className="text-xs font-bold uppercase tracking-wider text-gray-400">Assign To</span>}
              >
                <Select placeholder="Select user" className="h-10 w-full" allowClear>
                  {usersData?.data?.map((user: any) => (
                    <Select.Option key={user.id} value={user.id}>
                      {user.name || user.email}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="h-10 rounded-xl font-bold text-gray-400 border-none"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreating}
                className="h-10 px-8 rounded-xl bg-[#FF6C37] hover:bg-[#e85a29] border-none font-bold"
              >
                Create Lead
              </Button>
            </div>
          </Form>
        </Modal>

        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
              <Target size={24} className="text-gray-200" />
            </div>
            <p className="text-gray-900 font-semibold">No leads found</p>
            <p className="text-gray-400 text-sm">Start by adding your first lead to the system.</p>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={leads}
            rowKey="id"
            pagination={{ pageSize: 10, size: "small", className: "px-6 pb-2" }}
            className="leads-table"
          />
        )}
      </div>

      <style jsx global>{`
        .leads-table .ant-table { background: transparent !important; }
        .leads-table .ant-table-thead > tr > th {
          background: #fafafa !important;
          color: #94a3b8 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
          font-weight: 700 !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 12px 16px !important;
        }
        .leads-table .ant-table-tbody > tr > td {
          padding: 12px 16px !important;
          border-bottom: 1px solid #f8fafc !important;
        }
      `}</style>
    </div>
  );
}
