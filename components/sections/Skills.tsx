"use client";

import { motion } from "framer-motion";
import Chip from "@/components/ui/Chip";
import data from "@/content/data.json";

// Maps data.json keys to display labels - edit labels here if you rename
// or add categories in data.json's skills object
const CATEGORY_LABELS: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks & Libraries",
  tools: "Tools & Platforms",
  databases: "Databases",
  concepts: "Concepts",
};

export default function Skills() {
  const categories = Object.entries(data.skills) as [string, string[]][];

  return (
    <section
      id="skills"
      className="relative py-20 md:py-28 px-4 md:px-8 bg-washi dark:bg-ink transition-colors"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-3 h-3 bg-blade shrink-0" />
          <h2 className="font-heading text-3xl md:text-4xl text-ink dark:text-washi">
            Skills
          </h2>
        </motion.div>

        {/* Category groups */}
        <div className="flex flex-col gap-10">
          {categories.map(([key, items], groupIndex) => {
            if (!items || items.length === 0) return null;
            const label = CATEGORY_LABELS[key] ?? key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
              >
                {/* Category label */}
                <h3 className="font-heading text-sm md:text-base tracking-[0.15em] uppercase text-blade dark:text-blade-light mb-4">
                  {label}
                </h3>

                {/* Chips for this category */}
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, i) => (
                    <Chip
                      key={skill}
                      variant={i % 3 === 0 ? "filled" : "outline"}
                      delay={i * 0.04}
                    >
                      {skill}
                    </Chip>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}