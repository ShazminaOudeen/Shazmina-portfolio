"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoids hydration mismatch since theme isn't known on server render
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-10 h-10 border-brutal bg-surface" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-10 h-10 flex items-center justify-center border-brutal shadow-brutal-sm press-effect bg-surface text-ink dark:bg-surface dark:text-washi"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={2.5} />
      ) : (
        <Moon size={18} strokeWidth={2.5} />
      )}
    </button>
  );
}