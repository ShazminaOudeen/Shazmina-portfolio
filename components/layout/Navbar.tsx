"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import data from "@/content/data.json";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#timeline" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
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
        className={`fixed top-0 left-0 right-0 z-50 border-b-4 border-ink dark:border-washi bg-washi dark:bg-ink transition-shadow ${
          scrolled ? "shadow-brutal" : ""
        }`}
      >
        {/* Full-width edge-to-edge padding instead of a centered max-w container,
            so name and controls sit right at the screen corners */}
        <div className="relative w-full px-4 sm:px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo / Name - pulled from data.json, not hardcoded */}
          <Link
            href="#top"
            className="font-heading text-base sm:text-lg md:text-2xl tracking-wide text-ink dark:text-washi whitespace-nowrap shrink-0"
          >
            {data.personal.name.toUpperCase()}
          </Link>

          {/* Desktop nav links - absolutely centered in the bar regardless of
              how wide the name or right-side controls are */}
          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative font-body font-medium text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0 after:bg-blade dark:after:bg-blade-light hover:after:w-full after:transition-all"
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
              className="md:hidden w-10 h-10 flex items-center justify-center border-2 border-ink dark:border-washi shadow-brutal-sm press-effect bg-surface"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2.5} className="text-ink" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-ink flex flex-col">
          <div className="flex items-center justify-between gap-3 px-4 h-16 border-b-4 border-washi shrink-0">
            <span className="font-heading text-sm xs:text-base sm:text-lg text-washi tracking-wide truncate">
              {data.personal.name.toUpperCase()}
            </span>
            <button
              className="w-10 h-10 shrink-0 flex items-center justify-center border-2 border-washi text-washi press-effect"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          <ul className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-2xl sm:text-3xl text-washi hover:text-blade-light transition-colors"
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
                className="flex items-center gap-2 px-6 h-12 border-2 border-washi bg-blade text-washi font-body font-semibold shadow-brutal-sm press-effect"
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