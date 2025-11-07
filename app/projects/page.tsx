import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main>
      <Nav />
      <section className="py-12">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="mt-2 text-zinc-700">A small set for now—more coming soon.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}