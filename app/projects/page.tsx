import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import CfbTop25Card from "@/components/CfbTop25Card";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const otherProjects = projects; // later you can filter out the CFB one if you want

  return (
    <main>
      <Nav />

      <section className="page-section">
        <h1 className="page-heading">Projects</h1>
        <p className="page-subtitle">
          A few things I’ve been working on. I like connecting data, systems, and
          real-world behavior, rather than just building toy examples.
        </p>
      </section>

      {/* Featured analytics project */}
      <section className="page-section">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <CfbTop25Card />

          <div className="card">
            <h2 className="text-xl font-semibold">About this ranking system</h2>
            <p className="mt-3 text-sm text-zinc-700">
              This is an “unbiased” win/loss-based system. Teams earn points based on
              the total wins of the teams they’ve beaten, and lose points based on the
              total losses of the teams they’ve lost to. Scores are normalized by
              games played and filtered to FBS teams only.
            </p>
            <p className="mt-3 text-sm text-zinc-700">
              That makes it easier to compare teams based on the strength of who they
              actually beat and who they lost to, rather than pre-season expectations,
              polls, or brand strength.
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              Data source: collegefootballdata.com API (FBS only). Rankings are
              regenerated periodically via a Python script that updates a JSON file
              this site reads.
            </p>
          </div>
        </div>
      </section>

      {/* Other projects grid */}
      <section className="page-section">
        <h2 className="text-2xl font-semibold">More projects</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
