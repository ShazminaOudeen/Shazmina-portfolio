"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TimelineCard, { TimelineEntry } from "@/components/ui/Timelinecard";
import EducationCard from "@/components/ui/EducationCard";
import data from "@/content/data.json";

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

const SCROLL_THRESHOLD = 6;

export default function Timeline() {
  const timeline = data.timeline as Record<string, TimelineEntry[]>;
  const scrollRef = useRef<HTMLDivElement>(null);

  const availableCategories = CATEGORY_ORDER.filter(
    (key) => timeline[key] && timeline[key].length > 0
  );

  const [activeTab, setActiveTab] = useState(availableCategories[0] ?? "");

  if (availableCategories.length === 0) return null;

  const isEducation = activeTab === "education";
  const entries = timeline[activeTab] ?? [];
  const needsScroll = !isEducation && entries.length > SCROLL_THRESHOLD;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="timeline"
      className="relative py-14 md:py-20 px-4 md:px-8 bg-washi dark:bg-ink transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading + scroll arrows (only when this tab has more
            than 6 entries) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-blade shrink-0" />
            <h2 className="font-heading text-3xl md:text-4xl text-ink dark:text-washi">
              Experience
            </h2>
          </div>

          {needsScroll && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 flex items-center justify-center border-2 border-ink dark:border-washi text-ink dark:text-washi hover:bg-blade hover:border-blade hover:text-washi transition-colors press-effect"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 flex items-center justify-center border-2 border-ink dark:border-washi text-ink dark:text-washi hover:bg-blade hover:border-blade hover:text-washi transition-colors press-effect"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          )}
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

        {/* Entries for the active tab */}
        <AnimatePresence mode="wait">
          {isEducation ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              {entries.map((entry, i) => (
                <EducationCard key={`${entry.title}-${i}`} entry={entry} delay={i * 0.06} />
              ))}
            </motion.div>
          ) : needsScroll ? (
            /* More than 6 entries: simple single-row horizontal scroll.
               Cards keep their natural height (no h-full stretching),
               scrollbar hidden, navigation via drag/swipe or the arrows
               above. */
            <motion.div
              key={activeTab}
              ref={scrollRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-2"
            >
              {entries.map((entry, i) => (
                <div
                  key={`${entry.title}-${i}`}
                  className="snap-start shrink-0 w-70 sm:w-77.5 md:w-[320px]"
                >
                  <TimelineCard entry={entry} delay={i * 0.06} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start"
            >
              {entries.map((entry, i) => (
                <TimelineCard key={`${entry.title}-${i}`} entry={entry} delay={i * 0.06} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}