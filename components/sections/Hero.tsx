"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowRight, ArrowDown } from "lucide-react";
import data from "@/content/data.json";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center px-4 md:px-8 overflow-hidden bg-washi dark:bg-ink transition-colors"
    >
      {/* Subtle dot-grid background texture */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          color: "var(--foreground)",
        }}
      />

      <div className="relative max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left order-2 md:order-1"
        >
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body font-semibold text-blade dark:text-blade-light tracking-[0.2em] uppercase text-sm mb-3"
          >
            {data.personal.role}
          </motion.p>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-ink dark:text-washi leading-tight mb-4">
            {data.personal.name}
          </h1>

          <p className="font-body text-base md:text-lg text-ink/80 dark:text-washi/80 max-w-md mx-auto md:mx-0 mb-8">
            {data.personal.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 justify-center md:justify-start">
            <motion.a
              whileHover={{ x: 2, y: 2 }}
              href="#projects"
              className="flex items-center gap-2 px-6 h-12 border-2 border-ink dark:border-washi bg-ink dark:bg-washi text-washi dark:text-ink font-body font-semibold shadow-brutal press-effect"
            >
              View Projects
              <ArrowRight size={18} strokeWidth={2.5} />
            </motion.a>
            <motion.a
              whileHover={{ x: 2, y: 2 }}
              href={data.personal.cv}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 h-12 border-2 border-ink dark:border-washi bg-blade text-washi font-body font-semibold shadow-brutal-red press-effect"
            >
              <Download size={18} strokeWidth={2.5} />
              Download CV
            </motion.a>
          </div>
        </motion.div>

        {/* Cutout photo - transparent background, no frame, floats over
            bold geometric shapes for a neobrutalist "sticker" feel */}
        <div className="order-1 md:order-2 relative flex justify-center items-end h-80 sm:h-95 md:h-110">
          {/* Background shapes - animate in first, behind the photo */}
          <motion.div
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: -8, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-55 h-55 sm:w-65 sm:h-65 md:w-75 md:h-75 bg-blade border-4 border-ink dark:border-washi"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="absolute w-45 h-45 sm:w-55 sm:h-55 md:w-65 md:h-65 rounded-full border-4 border-ink dark:border-washi bg-transparent top-0 right-4 md:right-0"
          />
          {/* Small accent square, floats independently */}
          <motion.div
            className="absolute w-6 h-6 md:w-8 md:h-8 bg-ink dark:bg-washi top-6 left-2 md:left-8"
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Cutout photo - rises up and fades in, then gently floats */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative z-10 w-65 sm:w-[320px] md:w-95 h-full"
          >
            <motion.div
              className="w-full h-full relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              {data.personal.photo ? (
                <Image
                  src={data.personal.photo}
                  alt={data.personal.name}
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-end justify-center pb-4 text-ink/30 dark:text-washi/30 font-heading text-sm">
                  CUTOUT PHOTO
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink/50 dark:text-washi/50 hover:text-blade dark:hover:text-blade-light transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={22} strokeWidth={2} />
      </motion.a>
    </section>
  );
}