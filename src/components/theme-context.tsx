"use client";

import { ConfigProvider, theme as antTheme } from "antd";
import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "light";

export interface ThemeTokens {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorTextBase: string;
  colorTextSecondary: string;
  colorBgContainer: string;
  colorBgLayout: string;
  colorBorder: string;
  fontSizeBase: number;
  fontFamily: string;
  borderRadius: number;
}

interface ThemeContextType {
  tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* ---------------------------------------------
   Read tokens from CSS variables (single source)
------------------------------------------------*/
function readCssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function loadTokensFromCss(): ThemeTokens {
  return {
    colorPrimary: readCssVar("--primary"),
    colorSuccess: readCssVar("--accent"),
    colorWarning: readCssVar("--antd-color-warning"),
    colorError: readCssVar("--destructive"),
    colorInfo: readCssVar("--primary"),

    colorTextBase: readCssVar("--foreground"),
    colorTextSecondary: readCssVar("--muted-foreground"),

    colorBgContainer: readCssVar("--card"),
    colorBgLayout: readCssVar("--background"),

    colorBorder: readCssVar("--border"),

    fontSizeBase: 14,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",

    borderRadius: parseFloat(readCssVar("--radius")) * 16 || 12,
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<ThemeTokens | null>(null);

  useEffect(() => {
    setTokens(loadTokensFromCss());
  }, []);

  const antDesignTheme = useMemo(() => {
    if (!tokens) return undefined;

    return {
      algorithm: antTheme.defaultAlgorithm,
      token: {
        colorPrimary: tokens.colorPrimary,
        colorSuccess: tokens.colorSuccess,
        colorWarning: tokens.colorWarning,
        colorError: tokens.colorError,
        colorInfo: tokens.colorInfo,

        colorText: tokens.colorTextBase,
        colorTextSecondary: tokens.colorTextSecondary,

        colorBgContainer: tokens.colorBgContainer,
        colorBgLayout: tokens.colorBgLayout,

        colorBorder: tokens.colorBorder,

        borderRadius: tokens.borderRadius,
        fontFamily: tokens.fontFamily,
        fontSize: tokens.fontSizeBase,

        controlOutline: "transparent",
        controlOutlineWidth: 0,
      },
      components: {
        Button: {
          borderRadius: tokens.borderRadius,
        },
        Checkbox: { colorPrimary: tokens.colorPrimary },
        Radio: { colorPrimary: tokens.colorPrimary },
        Switch: { colorPrimary: tokens.colorPrimary },
        Slider: { colorPrimary: tokens.colorPrimary },
        Tabs: {
          colorPrimary: tokens.colorPrimary,
          inkBarColor: tokens.colorPrimary,
        },
      },
    };
  }, [tokens]);

  if (!tokens || !antDesignTheme) return null;

  return (
    <ThemeContext.Provider value={{ tokens }}>
      <ConfigProvider theme={antDesignTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
