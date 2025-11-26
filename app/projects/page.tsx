// app/projects/page.tsx

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import CfbTop25Card from "@/components/CfbTop25Card";
import ProjectsTable from "@/components/ProjectsTable";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  // Don’t re-list the two big featured projects in the small grid
  const otherProjects = projects.filter(
    (p) =>
      p.slug !== "cfb-rankings" && p.slug !== "drone-orientation"
  );

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

      {/* Featured projects */}
      <section className="page-section">
        <h2 className="text-2xl font-semibold">Featured projects</h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* CFB rankings: whole card is clickable, no extra wrapper card */}
          <CfbTop25Card asLink />

          {/* Drone orientation card – entire card clickable */}
          <Link
            href="/projects/drone-orientation"
            className="block focus:outline-none"
          >
            <article className="card h-full">
              <h3 className="text-xl font-semibold">
                Drone Orientation Sensor Fusion (Capstone)
              </h3>
              <p className="mt-3 text-sm text-zinc-700">
                Embedded Jetson Nano + ROS project where I fused IMU and camera
                data with an Extended Kalman Filter to estimate roll, pitch, and
                yaw in real time. Compared to IMU-only and vision-only baselines,
                the EKF reduced roll-angle error to 3.01° RMSE (roughly 60%
                improvement over IMU-only and 45% over vision-only) and produced
                much smoother angle-rate estimates.
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border bg-white">
                <Image
                  src="/drone/system-architecture.svg"
                  alt="System architecture diagram for the drone orientation project"
                  width={1400}
                  height={800}
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                Due to an NDA, the firmware and full codebase can’t be shared on
                GitHub, but the system design and performance are documented on
                the project page.
              </p>
            </article>
          </Link>
        </div>
      </section>

      {/* Other projects grid (no duplicates of the big featured ones) */}
      <section className="page-section">
        <h2 className="text-2xl font-semibold">More projects</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          These cards link out to individual project pages with more context,
          tradeoffs, and technical details. For NDA-protected work, I share
          results and design decisions instead of source code.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* All projects list with tags + filter */}
      <section className="page-section">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">All projects</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          A quick index of everything on this site. Each project title links to
          its detail page, and tags show the type, year, and key concepts used.
          Use the tag filter to narrow things down.
        </p>

        <ProjectsTable projects={projects} />
      </section>

      <Footer />
    </main>
  );
}
