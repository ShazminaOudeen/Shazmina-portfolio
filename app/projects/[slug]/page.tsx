import { notFound } from "next/navigation";
import data from "@/content/data.json";
import ProjectDetail from "@/components/project/ProjectDetail";
import { Project } from "@/components/ui/ProjectCard";

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