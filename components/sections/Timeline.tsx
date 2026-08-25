"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TimelineCard, { TimelineEntry } from "@/components/ui/Timelinecard";
import EducationCard from "@/components/ui/EducationCard";
import data from "@/content/data.json";

// Only categories with at least one entry in data.json will show as tabs.
// No work experience yet? Just leave "work" as an empty array (or omit it)
// in data.json and this tab won't appear at all.
const CATEGORY_LABELS: Record<string, string> = {
  work: "Work",
  education: "Education",
  certifications: "Certifications",
  achievements: "Achievements",
  volunteering: "Leadership & Volunteering",
};

const CATEGORY_ORDER = [
  "work",
  "education",
  "certifications",
  "achievements",
  "volunteering",
];

export default function Timeline() {
  const timeline = data.timeline as Record<string, TimelineEntry[]>;

  const availableCategories = CATEGORY_ORDER.filter(
    (key) => timeline[key] && timeline[key].length > 0
  );

  const [activeTab, setActiveTab] = useState(availableCategories[0] ?? "");

  if (availableCategories.length === 0) return null;

  // Education gets a long-format stacked layout; everything else uses the
  // compact grid-tile layout with image galleries
  const isEducation = activeTab === "education";

  return (
    <section
      id="timeline"
      className="relative py-20 md:py-28 px-4 md:px-8 bg-washi dark:bg-ink transition-colors"
    >
      <div className="max-w-4xl mx-auto">
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
            Experience
          </h2>
        </motion.div>

        {/* Category tabs - underline style */}
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
                  layoutId="timeline-tab-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-0.75 bg-blade dark:bg-blade-light"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Entries for the active tab - layout switches based on category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={
              isEducation
                ? "flex flex-col gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            }
          >
            {timeline[activeTab]?.map((entry, i) =>
              isEducation ? (
                <EducationCard key={`${entry.title}-${i}`} entry={entry} delay={i * 0.06} />
              ) : (
                <TimelineCard key={`${entry.title}-${i}`} entry={entry} delay={i * 0.06} />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}