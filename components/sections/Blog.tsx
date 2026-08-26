"use client";

import { motion } from "framer-motion";
import BlogCard, { BlogPost } from "@/components/ui/BlogCard";
import data from "@/content/data.json";

export default function Blog() {
  const posts = data.blog as BlogPost[];
  const hasPosts = posts && posts.length > 0 && posts.some((p) => p.title);

  // No posts written yet? Skip the section entirely rather than showing
  // an empty/awkward placeholder area.
  if (!hasPosts) return null;

  return (
    <section
      id="publications"
      className="relative py-14 md:py-20 px-4 md:px-8 bg-washi dark:bg-ink transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-3 h-3 bg-blade shrink-0" />
          <h2 className="font-heading text-3xl md:text-4xl text-ink dark:text-washi">
            Publications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.mediumUrl || post.title} post={post} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}