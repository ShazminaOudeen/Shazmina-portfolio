"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowRight, ArrowDown, Mail } from "lucide-react";
import data from "@/content/data.json";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: data.personal.github || "#",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: data.personal.linkedin || "#",
    Icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: data.personal.email ? `mailto:${data.personal.email}` : "#",
    Icon: Mail,
  },
];

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

          <p className="font-body text-base md:text-lg text-ink/80 dark:text-washi/80 max-w-md mx-auto md:mx-0 mb-6">
            {data.personal.tagline}
          </p>

          {/* Social icons - placed here since many visitors never scroll
              down to the footer where these links normally live */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 justify-center md:justify-start mb-8"
          >
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.Icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 flex items-center justify-center border-2 border-ink dark:border-washi text-ink dark:text-washi hover:bg-blade hover:border-blade hover:text-washi transition-colors press-effect"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>

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
                  sizes="(max-width: 768px) 260px, 380px"
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