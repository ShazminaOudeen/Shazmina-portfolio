"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import data from "@/content/data.json";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 px-4 md:px-8 bg-washi dark:bg-ink transition-colors overflow-hidden"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 items-center">
        {/* Image side - bordered card with offset shadow block behind it,
            same visual language as the Hero photo treatment */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-120 mx-auto md:mx-0"
        >
          <motion.div
            className="relative w-full aspect-square"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/about_cat.png"
              alt="About section illustration"
              fill
              className="object-contain drop-shadow-xl"
            />
          </motion.div>
        </motion.div>

        {/* Text side */}
        <div>
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-3 h-3 bg-blade shrink-0" />
            <h2 className="font-heading text-3xl md:text-4xl text-ink dark:text-washi">
              About Me
            </h2>
          </motion.div>

          {/* Bio - bordered block instead of plain paragraph, more presence */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="border-l-4 border-blade pl-5 mb-8"
          >
            <p className="font-body text-base md:text-lg text-ink/85 dark:text-washi/85 leading-relaxed">
              {data.personal.bio}
            </p>
          </motion.div>

          {/* Quick fact chips - pulled from data.json */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {data.personal.quickFacts.map((fact, i) => (
              <motion.span
                key={fact}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                whileHover={{ x: 2, y: 2 }}
                className={`px-4 py-2 border-2 border-ink dark:border-washi font-body text-sm font-semibold shadow-brutal-sm transition-transform ${
                  i % 2 === 0
                    ? "bg-blade text-washi"
                    : "bg-surface dark:bg-[#161616] text-ink dark:text-washi"
                }`}
              >
                {fact}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}