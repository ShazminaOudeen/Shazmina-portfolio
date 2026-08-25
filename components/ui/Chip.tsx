"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  variant?: "filled" | "outline";
  delay?: number;
}

// Reusable bordered chip/badge - used across Skills, About's quick facts,
// Project tech tags, etc. Keeps the neobrutalism chip style consistent
// in one place instead of repeating the same classes in every section.
export default function Chip({ children, variant = "outline", delay = 0 }: ChipProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ x: 2, y: 2 }}
      className={`inline-flex items-center px-4 py-2 border-2 border-ink dark:border-washi font-body text-sm font-semibold shadow-brutal-sm transition-transform cursor-default ${
        variant === "filled"
          ? "bg-blade text-washi"
          : "bg-surface dark:bg-[#161616] text-ink dark:text-washi"
      }`}
    >
      {children}
    </motion.span>
  );
}