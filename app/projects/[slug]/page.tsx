import { notFound } from "next/navigation";
import data from "@/content/data.json";
import ProjectDetail from "@/components/project/ProjectDetail";
import { Project } from "@/components/ui/ProjectCard";

// Thin route wrapper - Next.js requires this file to be named page.tsx,
// but the real layout/logic lives in components/project/ProjectDetail.tsx

// Pre-renders a static page for every project slug at build time
export function generateStaticParams() {
  const projects = data.projects as Project[];
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = data.projects as Project[];
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return <ProjectDetail project={project} />;
}