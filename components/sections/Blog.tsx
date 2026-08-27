"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard, { BlogPost } from "@/components/ui/BlogCard";
import data from "@/content/data.json";

export default function Blog() {
  const posts = data.blog as BlogPost[];
  const hasPosts = posts && posts.length > 0 && posts.some((p) => p.title);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // No posts written yet? Skip the section entirely rather than showing
  // an empty/awkward placeholder area.
  if (!hasPosts) return null;

  return (
    <section
      id="publications"
      className="relative py-14 md:py-20 px-4 md:px-8 bg-washi dark:bg-ink transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading + scroll arrows */}
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
              Publications
            </h2>
          </div>

          {posts.length > 3 && (
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

        {/* Horizontal scroll row - roughly 3 cards visible at once on
            desktop, rest scrollable via drag/swipe or the arrow buttons */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin"
        >
          {posts.map((post, i) => (
            <div
              key={post.mediumUrl || post.title}
              className="snap-start shrink-0 w-70 sm:w-[320px] md:w-85"
            >
              <BlogCard post={post} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}