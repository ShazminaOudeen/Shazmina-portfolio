"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ExternalLink, ArrowRight, Play } from "lucide-react";
import { getYoutubeThumbnail } from "@/lib/youtube";

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  images: string[];
  youtubeLink?: string;
  liveLink?: string;
  repoLink?: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z" />
  </svg>
);

// Reusable project card - the whole card navigates to the project's detail
// page on click (a clickable div + router.push, not a <Link>, to avoid
// nesting an <a> inside another <a> from the icon links below).
// Cover image priority: first image in `images`, else a YouTube thumbnail
// auto-derived from `youtubeLink` (with a play icon overlay), else a
// placeholder.
export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const firstImage = project.images?.[0];
  const youtubeThumbnail = getYoutubeThumbnail(project.youtubeLink);
  const coverImage = firstImage || youtubeThumbnail;
  const isVideoCover = !firstImage && !!youtubeThumbnail;

  const router = useRouter();
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const goToDetail = () => router.push(`/projects/${project.slug}`);
  const goToDetailOnKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetail();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
    >
      <div
        role="link"
        tabIndex={0}
        onClick={goToDetail}
        onKeyDown={goToDetailOnKey}
        className="group block h-full border-2 border-ink dark:border-washi bg-surface dark:bg-[#161616] shadow-brutal-sm hover:shadow-brutal transition-shadow cursor-pointer"
      >
        {/* Cover image / video thumbnail */}
        <div className="relative w-full h-44 border-b-2 border-ink dark:border-washi overflow-hidden bg-washi dark:bg-ink">
          {coverImage ? (
            <>
              <Image
                src={coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {isVideoCover && (
                <div className="absolute inset-0 flex items-center justify-center bg-ink/20">
                  <div className="w-12 h-12 rounded-full bg-blade/90 flex items-center justify-center border-2 border-washi">
                    <Play size={20} fill="white" className="text-washi ml-0.5" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ink/30 dark:text-washi/30 font-heading text-sm">
              NO IMAGE
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3">
          <h3 className="font-heading text-xl text-ink dark:text-washi">
            {project.title}
          </h3>

          <p className="font-body text-sm text-ink/75 dark:text-washi/75 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {project.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 border-2 border-ink dark:border-washi text-xs font-body font-semibold text-ink dark:text-washi"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2 pt-3 border-t-2 border-ink/10 dark:border-washi/10">
            <div className="flex items-center gap-3">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  aria-label="View repository"
                  className="text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors"
                >
                  <GithubIcon size={18} />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  aria-label="View live demo"
                  className="text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors"
                >
                  <ExternalLink size={18} strokeWidth={2} />
                </a>
              )}
              {project.youtubeLink && (
                <a
                  href={project.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={stop}
                  aria-label="Watch demo video"
                  className="text-ink dark:text-washi hover:text-blade dark:hover:text-blade-light transition-colors"
                >
                  <YoutubeIcon size={18} />
                </a>
              )}
            </div>

            <span className="flex items-center gap-1 font-body text-sm font-semibold text-blade dark:text-blade-light">
              View
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}