/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  useGetNotificationsQuery,
  useGetNotificationUnreadCountQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from "@/redux/features/notification/notificationApi";
import { TNotification } from "@/types/notifications";
import {
  BellOutlined,
  ClockCircleOutlined,
  FileOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Badge, Button, Empty, Spin } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

dayjs.extend(relativeTime);

export default function NotificationMenu() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const primaryColor = "#165dff";

  const { data: notificationsData, isLoading } = useGetNotificationsQuery({
    limit: 5,
  });
  const { data: unreadData } = useGetNotificationUnreadCountQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  const unreadCount = unreadData?.count || 0;
  const notifications = notificationsData?.data || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "NEW_MESSAGE":
      case "MESSAGE_REPLY":
        return <MessageOutlined style={{ color: "#165dff" }} />;
      case "ORDER_PLACED":
        return <FileOutlined style={{ color: "#10b981" }} />;
      default:
        return <BellOutlined />;
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  return (
    <div style={{ position: "relative", marginRight: "16px" }}>
      <Badge count={unreadCount} overflowCount={9}>
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: 18 }} />}
          onClick={() => setShowNotifications(!showNotifications)}
          style={{
            color: "rgba(0, 0, 0, 0.65)",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            background: showNotifications
              ? "rgba(0, 0, 0, 0.05)"
              : "transparent",
          }}
        />
      </Badge>
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            ref={notificationRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "60px",
              right: "0",
              zIndex: 1000,
            }}
          >
            <div className="border border-gray-100 rounded-lg shadow-lg bg-white w-80 overflow-hidden">
              <div
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                className="flex justify-between items-center border-b border-gray-100 py-3"
              >
                <span className="font-medium text-base">Notifications</span>
                <Button
                  type="text"
                  size="small"
                  onClick={handleMarkAllAsRead}
                  style={{
                    color: primaryColor,
                    fontWeight: "500",
                    fontSize: "13px",
                  }}
                >
                  Mark all as read
                </Button>
              </div>

              <div className="max-h-[360px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <Spin />
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map((item: TNotification) => (
                    <div
                      key={item.id}
                      onClick={() => handleMarkAsRead(item.id)}
                      style={{
                        padding: "12px 14px",
                        margin: "6px 10px",
                        borderRadius: "10px",
                        background: item.isRead
                          ? "white"
                          : "rgba(22, 93, 255, 0.04)",
                        border: `1px solid ${
                          item.isRead
                            ? "rgba(0, 0, 0, 0.06)"
                            : "rgba(22, 93, 255, 0.12)"
                        }`,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      className="hover:shadow-sm hover:border-gray-200"
                    >
                      <div className="flex gap-3 items-start">
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "8px",
                            background: item.isRead
                              ? "#f3f4f6"
                              : "rgba(22, 93, 255, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 16,
                            flexShrink: 0,
                          }}
                        >
                          {getNotificationIcon(item.type?.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            style={{
                              fontSize: 13.5,
                              fontWeight: item.isRead ? 500 : 600,
                              color: item.isRead ? "#6b7280" : "#111827",
                              marginBottom: 3,
                              lineHeight: 1.4,
                            }}
                          >
                            {item.title}
                          </div>
                          <div
                            style={{
                              fontSize: 12.5,
                              color: "#9ca3af",
                              marginBottom: 2,
                              lineHeight: 1.4,
                            }}
                            className="line-clamp-2"
                          >
                            {item.message}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "#9ca3af",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              maxHeight: "20px",
                              overflow: "hidden",
                            }}
                          >
                            <ClockCircleOutlined style={{ fontSize: 10 }} />
                            {dayjs(item.createdAt).fromNow()}
                          </div>
                        </div>
                        {!item.isRead && (
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: "#165dff",
                              marginTop: 2,
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="No notifications"
                    />
                  </div>
                )}
              </div>

              <div className="p-2 text-center border-t border-gray-50 bg-gray-50/50">
                <Button
                  type="link"
                  className="w-full font-medium"
                  style={{ color: primaryColor }}
                >
                  View all notifications
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
