"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TimelineEntry } from "./Timelinecard";

interface EducationCardProps {
  entry: TimelineEntry;
  delay?: number;
}

// Long-format card specifically for Education entries - image (if any) on
// the left, full details on the right. Education usually has few entries
// with more to say (GPA, honors, coursework), so a wide card fits better
// than a compact grid tile.
export default function EducationCard({ entry, delay = 0 }: EducationCardProps) {
  const image = entry.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
      className="border-2 border-ink dark:border-washi bg-surface dark:bg-[#161616] shadow-brutal-sm hover:shadow-brutal transition-shadow p-5 md:p-6 flex flex-col sm:flex-row gap-5"
    >
      {image && (
        <div className="relative w-full sm:w-32 h-40 sm:h-32 shrink-0 border-2 border-ink dark:border-washi overflow-hidden">
          <Image src={image} alt={entry.org} fill className="object-cover" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h4 className="font-heading text-xl md:text-2xl text-ink dark:text-washi">
          {entry.title}
        </h4>
        <p className="font-body font-semibold text-sm text-blade dark:text-blade-light mt-1">
          {entry.org}
        </p>
        <p className="font-body text-xs text-ink/60 dark:text-washi/60 mt-1 mb-3">
          {entry.dateRange}
        </p>
        <p className="font-body text-sm md:text-base text-ink/80 dark:text-washi/80 leading-relaxed">
          {entry.description}
        </p>

        {(entry.gpa || (entry.highlights && entry.highlights.length > 0)) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {entry.gpa && (
              <span className="px-3 py-1 border-2 border-blade text-blade dark:text-blade-light font-body text-xs font-bold">
                GPA {entry.gpa}
              </span>
            )}
            {entry.highlights?.map((highlight) => (
              <span
                key={highlight}
                className="px-3 py-1 bg-blade text-washi font-body text-xs font-bold"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}