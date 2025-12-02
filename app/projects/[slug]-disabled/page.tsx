import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main>
      <Nav />
      <article className="prose prose-zinc mt-10 max-w-none">
        <h1>{project.title}</h1>
        <p><strong>Tech:</strong> {project.tech.join(", ")}</p>
        <p>{project.summary}</p>
        <h2>What I did</h2>
        <ul>
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
        {project.repo && (
          <p><a href={project.repo} target="_blank" rel="noreferrer">Code ↗</a></p>
        )}
        {project.demo && (
          <p><a href={project.demo} target="_blank" rel="noreferrer">Live demo ↗</a></p>
        )}
      </article>
      <Footer />
    </main>
  );
}