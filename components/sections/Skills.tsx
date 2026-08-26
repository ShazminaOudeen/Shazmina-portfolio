"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Chip from "@/components/ui/Chip";
import data from "@/content/data.json";

const CATEGORY_LABELS: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks & Libraries",
  tools: "Tools & Platforms",
  databases: "Databases",
  concepts: "Concepts",
};

const CATEGORY_ORDER = ["languages", "frameworks", "tools", "databases", "concepts"];

export default function Skills() {
  const skills = data.skills as Record<string, string[]>;

  const availableCategories = CATEGORY_ORDER.filter(
    (key) => skills[key] && skills[key].length > 0
  );

  const [activeTab, setActiveTab] = useState(availableCategories[0] ?? "");

  if (availableCategories.length === 0) return null;

  return (
    <section
      id="skills"
      className="relative py-14 md:py-20 px-4 md:px-8 bg-washi dark:bg-ink transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-3 h-3 bg-blade shrink-0" />
          <h2 className="font-heading text-3xl md:text-4xl text-ink dark:text-washi">
            Skills
          </h2>
        </motion.div>

        {/* Category filter tabs - underline style, visually distinct from
            the bordered skill chips below so it's clear these are filters,
            not skills themselves */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 border-b-2 border-ink/15 dark:border-washi/15 pb-0">
          {availableCategories.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative pb-3 font-heading text-sm md:text-base tracking-wide transition-colors ${
                activeTab === key
                  ? "text-blade dark:text-blade-light"
                  : "text-ink/50 dark:text-washi/50 hover:text-ink dark:hover:text-washi"
              }`}
            >
              {CATEGORY_LABELS[key] ?? key}
              {activeTab === key && (
                <motion.span
                  layoutId="skills-tab-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-0.75 bg-blade dark:bg-blade-light"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Chips for the active category only */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-3 md:gap-4 min-h-12"
          >
            {skills[activeTab]?.map((skill, i) => (
              <Chip key={skill} variant={i % 3 === 0 ? "filled" : "outline"} delay={i * 0.04}>
                {skill}
              </Chip>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}