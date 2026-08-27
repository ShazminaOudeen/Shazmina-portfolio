"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import data from "@/content/data.json";

export default function AllProjectsGrid() {
  const projects = data.projects as Project[];

  return (
    <section className="py-14 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-body font-semibold text-sm text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors mb-6 group"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2.5}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-3 h-3 bg-blade shrink-0" />
          <h1 className="font-heading text-3xl md:text-4xl text-ink dark:text-washi">
            All Projects
          </h1>
        </motion.div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 0.06} />
            ))}
          </div>
        ) : (
          <p className="font-body text-ink/60 dark:text-washi/60">
            No projects yet.
          </p>
        )}
      </div>
    </section>
  );
}