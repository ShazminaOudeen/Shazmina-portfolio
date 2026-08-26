"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  mediumUrl: string;
  coverImage?: string;
}

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

// Reusable card for a single blog post - links out to the full article on
// Medium (or wherever mediumUrl points), opens in a new tab. Cover image
// is optional; card layout adapts whether or not one is provided.
export default function BlogCard({ post, delay = 0 }: BlogCardProps) {
  return (
    <motion.a
      href={post.mediumUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
      className="group flex flex-col h-full border-2 border-ink dark:border-washi bg-surface dark:bg-[#161616] shadow-brutal-sm hover:shadow-brutal transition-shadow"
    >
      {post.coverImage && (
        <div className="relative w-full h-40 border-b-2 border-ink dark:border-washi overflow-hidden shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <p className="font-body text-xs font-semibold text-blade dark:text-blade-light uppercase tracking-wide mb-2">
          {post.date}
        </p>
        <h3 className="font-heading text-xl text-ink dark:text-washi mb-3">
          {post.title}
        </h3>
        <p className="font-body text-sm text-ink/75 dark:text-washi/75 leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-blade dark:text-blade-light">
          Read on Medium
          <ArrowUpRight
            size={15}
            strokeWidth={2.5}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </span>
      </div>
    </motion.a>
  );
}