import { TNotification } from "@/types/notifications";

export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}d`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)}mo`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)}y`;
  }
};

export const getTimeGroup = (dateString: string | Date): string => {
  const now = new Date();
  const date = new Date(dateString);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const notificationDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  if (notificationDate.getTime() === today.getTime()) {
    return "Today";
  } else if (notificationDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else if (
    now.getTime() - notificationDate.getTime() <
    7 * 24 * 60 * 60 * 1000
  ) {
    return "This Week";
  } else if (
    now.getTime() - notificationDate.getTime() <
    30 * 24 * 60 * 60 * 1000
  ) {
    return "This Month";
  } else {
    return "Older";
  }
};

export const groupNotificationsByTime = (notifications: TNotification[]) => {
  const groups: { [key: string]: TNotification[] } = {};

  notifications.forEach((notification) => {
    const group = getTimeGroup(notification.createdAt);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(notification);
  });

  // Sort groups by priority
  const groupOrder = ["Today", "Yesterday", "This Week", "This Month", "Older"];
  const sortedGroups: { [key: string]: TNotification[] } = {};

  groupOrder.forEach((group) => {
    if (groups[group]) {
      sortedGroups[group] = groups[group].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
  });

  return sortedGroups;
};
