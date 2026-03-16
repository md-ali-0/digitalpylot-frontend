"use client";

import config from "@/config";
import { tags } from "@/constants";
import { baseApi } from "@/redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { notification } from "antd";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (token && !socketRef.current) {
      const socket = io(config.host as string, {
        auth: { token },
        path: "/socket.io",
      });

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      socket.on("new-notification", (data) => {
        notification.info({
          message: data.title,
          description: data.message,
          placement: "topRight",
        });
        // Invalidate notifications cache
        dispatch(baseApi.util.invalidateTags([tags.notificationTag]));
      });

      socket.on("new-message", () => {
        dispatch(baseApi.util.invalidateTags([tags.notificationTag]));
      });

      socket.on("unread-count-update", (data) => {
        if (data.type === "notification") {
          dispatch(baseApi.util.invalidateTags([tags.notificationTag]));
        }
      });

      socketRef.current = socket;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token, dispatch]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
