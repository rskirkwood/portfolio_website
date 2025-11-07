import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-2xl border p-4 transition hover:shadow-sm">
      <h3 className="text-lg font-semibold">
        <Link href={`/projects/${project.slug}`} className="hover:underline">
          {project.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-zinc-600">{project.summary}</p>
      <p className="mt-3 text-xs text-zinc-500">{project.tech.join(" · ")}</p>
      <div className="mt-3 text-sm">
        <Link href={`/projects/${project.slug}`} className="underline underline-offset-4">Details →</Link>
      </div>
    </article>
  );
}