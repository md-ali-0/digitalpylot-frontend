import { NotificationChannelType, NotificationTypeEnum } from "./enums";
import { User } from "./user";

export interface NotificationChannel {
  id: string;
  name: string;
  type: NotificationChannelType;
  description?: string | null;
  isActive: boolean;
}

export interface NotificationType {
  id: string;
  name: string;
  type: NotificationTypeEnum;
  description?: string | null;
  template?: string | null;
  isActive: boolean;
}

export interface TNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  data?: Record<string, unknown> | null;
  isRead: boolean;
  readAt?: Date | null;
  user?: User;
  type?: NotificationType;
  channel?: NotificationChannel;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface NotificationLog {
  id: string;
  notificationId: string;
  channelId: string;
  status: string;
  providerResponse?: string | null;
  errorMessage?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
