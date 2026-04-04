"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.finance.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      {children}
    </div>
  );
}
