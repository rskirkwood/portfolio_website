import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  const featured = projects.slice(0, 3);
  return (
    <main>
      <Nav />
      <section className="py-16">
        <p className="text-sm uppercase tracking-widest text-zinc-500">Hello, I’m</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Riley Kirkwood</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-700">
          Embedded-leaning engineer exploring full‑stack and data work. I like shipping
          simple, reliable things and iterating quickly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50">
            View Projects
          </Link>
          <Link href="/about" className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50">
            About & Resume
          </Link>
          <Link href="/contact" className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50">
            Contact
          </Link>
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />)
          )}
        </div>
        <div className="mt-6">
          <Link href="/projects" className="text-sm text-zinc-700 underline underline-offset-4">
            See all projects →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}