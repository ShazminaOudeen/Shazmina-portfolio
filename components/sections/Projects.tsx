"use client";

import { motion } from "framer-motion";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import data from "@/content/data.json";

export default function Projects() {
  const projects = data.projects as Project[];

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-4 md:px-8 bg-washi dark:bg-ink transition-colors"
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

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 0.08} />
            ))}
          </div>
        ) : (
          <p className="font-body text-ink/60 dark:text-washi/60">
            Projects coming soon.
          </p>
        )}
      </div>
    </section>
  );
}