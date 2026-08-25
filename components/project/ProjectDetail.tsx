"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Project } from "@/components/ui/ProjectCard";
import { getYoutubeId } from "@/lib/youtube";

interface ProjectDetailProps {
  project: Project;
}

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

// Full project detail page content
export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = project.images ?? [];
  const hasMultiple = images.length > 1;
  const youtubeId = getYoutubeId(project.youtubeLink);

  // If someone lands on this page directly (deep link, refresh, new tab)
  // rather than clicking through from the homepage, the Preloader's own
  // "already played" flag never got set - mark it here too, so navigating
  // back to the homepage afterward doesn't unexpectedly replay it.
  useEffect(() => {
    sessionStorage.setItem("portfolio-preloader-played", "true");
  }, []);

  const nextImg = () => setImgIndex((i) => (i + 1) % images.length);
  const prevImg = () => setImgIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <main className="min-h-screen bg-washi dark:bg-ink pt-24 md:pt-28 pb-24 px-4 md:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-body font-semibold text-sm text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors mb-6 group"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2.5}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Projects
        </Link>

        {/* Header block - bordered like a card, matches site language */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-ink dark:border-washi bg-surface dark:bg-[#161616] shadow-brutal p-6 md:p-8 mb-8"
        >
          <h1 className="font-heading text-3xl md:text-5xl text-ink dark:text-washi mb-4">
            {project.title}
          </h1>

          {project.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 border-2 border-ink dark:border-washi text-xs font-body font-semibold text-ink dark:text-washi"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 h-11 border-2 border-ink dark:border-washi bg-blade text-washi font-body font-semibold text-sm shadow-brutal-sm press-effect"
              >
                <ExternalLink size={16} strokeWidth={2.5} />
                View Live Site
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 h-11 border-2 border-ink dark:border-washi bg-ink dark:bg-washi text-washi dark:text-ink font-body font-semibold text-sm shadow-brutal-sm press-effect"
              >
                <GithubIcon size={16} />
                View Repo
              </a>
            )}
          </div>
        </motion.div>

        {/* Image gallery - supports 4+ images */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative w-full h-64 md:h-105 border-2 border-ink dark:border-washi overflow-hidden bg-surface dark:bg-[#161616]">
              <Image
                src={images[imgIndex]}
                alt={`${project.title} - image ${imgIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
              {hasMultiple && (
                <>
                  <button
                    onClick={prevImg}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-ink/70 text-washi hover:bg-ink"
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={nextImg}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-ink/70 text-washi hover:bg-ink"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-ink/70 text-washi text-xs font-body font-semibold">
                    {imgIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip - lets visitors jump to any image directly */}
            {hasMultiple && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setImgIndex(i)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 border-2 overflow-hidden transition-opacity ${
                      i === imgIndex
                        ? "border-blade opacity-100"
                        : "border-ink/30 dark:border-washi/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Embedded YouTube demo video, if provided */}
        {youtubeId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8"
          >
            <h3 className="font-heading text-lg text-ink dark:text-washi mb-3">
              Demo Video
            </h3>
            <div className="relative w-full aspect-video border-2 border-ink dark:border-washi overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`${project.title} demo video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Full description / write-up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-l-4 border-blade pl-5"
        >
          <h3 className="font-heading text-lg text-ink dark:text-washi mb-3">
            About this project
          </h3>
          <p className="font-body text-base md:text-lg text-ink/85 dark:text-washi/85 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </motion.div>
      </div>
    </main>
  );
}