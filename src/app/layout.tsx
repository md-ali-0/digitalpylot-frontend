import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App as AntdApp } from "antd";
import { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Digital Pylot Starter",
  description: "Reusable frontend starter kit for role-based web apps.",
};

import { ThemeProvider } from "@/components/theme-context";
import ReduxProvider from "@/provider/redux-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ReduxProvider>
            <ThemeProvider>
              <AntdApp>{children}</AntdApp>
            </ThemeProvider>
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
