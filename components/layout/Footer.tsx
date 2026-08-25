"use client";

import { Mail, ArrowUp } from "lucide-react";
import data from "@/content/data.json";

// GitHub and LinkedIn are brand logos, removed from Lucide's icon set by
// design (Lucide doesn't ship brand marks) - using simple inline SVGs instead
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-washi dark:bg-ink border-t-4 border-blade transition-colors">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social links */}
        <div className="flex items-center gap-3">
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
                <Icon size={18} strokeWidth={2} />
              </a>
            );
          })}
        </div>

        {/* Copyright + signature mark */}
        <div className="flex items-center gap-2 order-first md:order-0">
          <span className="w-2 h-2 bg-blade" />
          <p className="font-body text-sm text-ink/70 dark:text-washi/70 text-center">
            © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
          </p>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 font-heading text-sm text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors group"
        >
          Back to Top
          <ArrowUp
            size={16}
            strokeWidth={2.5}
            className="group-hover:-translate-y-1 transition-transform"
          />
        </button>
      </div>
    </footer>
  );
}