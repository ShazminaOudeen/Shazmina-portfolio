"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 border-brutal bg-surface" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-10 h-10 flex items-center justify-center border-2 border-ink dark:border-washi shadow-brutal-sm press-effect bg-surface dark:bg-[#161616]"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={2.5} className="text-washi" />
      ) : (
        <Moon size={18} strokeWidth={2.5} className="text-ink" />
      )}
    </button>
  );
}