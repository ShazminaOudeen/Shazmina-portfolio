"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import data from "@/content/data.json";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b-4 border-ink dark:border-washi bg-washi/95 dark:bg-ink/95 backdrop-blur-sm transition-shadow ${
          scrolled ? "shadow-brutal" : ""
        }`}
      >
        <div className="relative w-full px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#top"
            className="font-heading text-base sm:text-lg md:text-2xl tracking-wide text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors whitespace-nowrap shrink-0"
          >
            {data.personal.name.toUpperCase()}
          </a>

          {/* Desktop nav links - absolutely centered in the bar */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative font-body font-medium text-sm lg:text-base text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.75 after:w-0 after:bg-blade dark:after:bg-blade-light hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: CV download + theme toggle + mobile menu button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={data.personal.cv}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 h-10 border-2 border-ink dark:border-washi bg-blade text-washi font-body font-semibold text-sm shadow-brutal-sm press-effect whitespace-nowrap"
            >
              <Download size={16} strokeWidth={2.5} />
              Download CV
            </a>
            <ThemeToggle />
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center border-2 border-ink dark:border-washi shadow-brutal-sm press-effect bg-surface dark:bg-[#161616]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2.5} className="text-ink dark:text-washi" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu - now theme-aware instead of hardcoded black */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60 bg-washi dark:bg-ink flex flex-col transition-colors">
          <div className="flex items-center justify-between gap-3 px-4 h-16 border-b-4 border-ink dark:border-washi shrink-0">
            <span className="font-heading text-sm xs:text-base sm:text-lg text-ink dark:text-washi tracking-wide truncate">
              {data.personal.name.toUpperCase()}
            </span>
            <button
              className="w-10 h-10 shrink-0 flex items-center justify-center border-2 border-ink dark:border-washi text-ink dark:text-washi press-effect"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          <ul className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-7 px-6 overflow-y-auto py-6">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{ animationDelay: `${i * 0.05}s` }}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
              >
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-2xl sm:text-3xl text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={data.personal.cv}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-6 h-12 border-2 border-ink dark:border-washi bg-blade text-washi font-body font-semibold shadow-brutal-sm press-effect"
              >
                <Download size={18} strokeWidth={2.5} />
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}