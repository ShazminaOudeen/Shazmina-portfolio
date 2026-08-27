"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import data from "@/content/data.json";

const FEATURED_COUNT = 6;

export default function Projects() {
  const allProjects = data.projects as (Project & { featured?: boolean })[];

  // Show projects explicitly marked "featured": true in data.json. If none
  // are marked, fall back to the first few so the homepage still has
  // something to show without extra setup.
  const featured = allProjects.some((p) => p.featured)
    ? allProjects.filter((p) => p.featured)
    : allProjects.slice(0, FEATURED_COUNT);

  const hasMore = allProjects.length > featured.length;

  return (
    <section
      id="projects"
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
            Projects
          </h2>
        </motion.div>

        {featured.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.slug} project={project} delay={i * 0.08} />
              ))}
            </div>

            {/* Only shows if there are more projects than what's featured
                here - links to the full /projects listing page */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mt-10"
              >
                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-6 h-12 border-2 border-ink dark:border-washi bg-ink dark:bg-washi text-washi dark:text-ink font-body font-semibold shadow-brutal press-effect"
                >
                  View All Projects
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
              </motion.div>
            )}
          </>
        ) : (
          <p className="font-body text-ink/60 dark:text-washi/60">
            Projects coming soon.
          </p>
        )}
      </div>
    </section>
  );
}