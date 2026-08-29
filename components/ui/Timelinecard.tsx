"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export interface TimelineEntry {
  title: string;
  org: string;
  dateRange: string;
  description: string;
  images?: string[]; // supports multiple images now (up to 3+)
  link?: string;
  gpa?: string;
  highlights?: string[];
}

interface TimelineCardProps {
  entry: TimelineEntry;
  delay?: number;
}

// Reusable card for a single timeline entry - used in a grid by Timeline.tsx
// across all categories (Work, Education, Certifications, Achievements,
// Leadership & Volunteering). Supports an optional image gallery (multiple
// photos per entry) with simple prev/next controls.
export default function TimelineCard({ entry, delay = 0 }: TimelineCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = entry.images ?? [];
  const hasMultiple = images.length > 1;

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % images.length);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };

  const CardInner = (
    <div className="h-full border-2 border-ink dark:border-washi bg-surface dark:bg-[#161616] shadow-brutal-sm hover:shadow-brutal transition-shadow flex flex-col">
      {images.length > 0 && (
        <div className="relative w-full h-40 border-b-2 border-ink dark:border-washi overflow-hidden shrink-0">
          <Image
            src={images[imgIndex]}
            alt={`${entry.org} - image ${imgIndex + 1}`}
            fill
            className="object-cover"
          />
          {hasMultiple && (
            <>
              <button
                onClick={prevImg}
                aria-label="Previous image"
                className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-ink/70 text-washi hover:bg-ink"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={nextImg}
                aria-label="Next image"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-ink/70 text-washi hover:bg-ink"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === imgIndex ? "bg-blade" : "bg-washi/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex-1 p-5 flex flex-col min-h-45">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-heading text-lg text-ink dark:text-washi">
            {entry.title}
          </h4>
          {entry.link && (
            <ExternalLink
              size={15}
              strokeWidth={2.5}
              className="text-blade dark:text-blade-light shrink-0 mt-1"
            />
          )}
        </div>
        <p className="font-body font-semibold text-sm text-blade dark:text-blade-light mt-1">
          {entry.org}
        </p>
        <p className="font-body text-xs text-ink/60 dark:text-washi/60 mt-1 mb-3">
          {entry.dateRange}
        </p>
        <p className="font-body text-sm text-ink/80 dark:text-washi/80 leading-relaxed flex-1">
          {entry.description}
        </p>

        {(entry.gpa || (entry.highlights && entry.highlights.length > 0)) && (
          <div className="flex flex-wrap gap-2 mt-3">
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
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
    >
      {entry.link ? (
        <a href={entry.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {CardInner}
        </a>
      ) : (
        CardInner
      )}
    </motion.div>
  );
}