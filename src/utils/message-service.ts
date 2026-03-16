import { message as antdMessage } from "antd";
import type { MessageInstance } from "antd/es/message/interface";

let messageInstance: MessageInstance = antdMessage;

export const setMessageInstance = (instance: MessageInstance) => {
  messageInstance = instance;
};

export const $message = {
  success: (content: any, duration?: number, onClose?: () => void) =>
    messageInstance.success(content, duration, onClose),
  error: (content: any, duration?: number, onClose?: () => void) =>
    messageInstance.error(content, duration, onClose),
  info: (content: any, duration?: number, onClose?: () => void) =>
    messageInstance.info(content, duration, onClose),
  warning: (content: any, duration?: number, onClose?: () => void) =>
    messageInstance.warning(content, duration, onClose),
  loading: (content: any, duration?: number, onClose?: () => void) =>
    messageInstance.loading(content, duration, onClose),
  open: (args: any) => messageInstance.open(args),
  destroy: (key?: any) => messageInstance.destroy(key),
};
