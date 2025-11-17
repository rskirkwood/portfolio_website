import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <h3 className="text-lg font-semibold">
        <Link href={`/projects/${project.slug}`} className="hover:underline">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-zinc-600">{project.summary}</p>
      <p className="mt-3 text-xs text-zinc-500">{project.tech.join(" · ")}</p>
      <div className="mt-4 text-sm">
        <Link href={`/projects/${project.slug}`} className="rounded-md border px-3 py-1 hover:bg-zinc-50">Details →</Link>
      </div>
    </article>
  );
}