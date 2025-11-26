// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import SocialIcons from "@/components/SocialIcons";
import { projects } from "@/data/projects";

export default function HomePage() {
  // Small cards: everything except the big featured drone project
  const featured = projects
    .filter((p) => p.slug !== "drone-orientation")
    .slice(0, 3);

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border py-12 sm:py-16 section-accent">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_90%_-10%,var(--theme-blue)_12%,transparent_60%)]" />

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 sm:grid-cols-[auto_1fr] sm:px-8">
          <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border shadow-sm sm:h-32 sm:w-32">
            <Image
              src="/images/profile.jpg"
              alt="Riley Kirkwood"
              width={256}
              height={256}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Hello, I’m
            </p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
              Riley Kirkwood
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-700">
              Computer Engineering grad focused on embedded systems with growing
              interest in backend/full-stack and data analytics. I ship simple,
              reliable things and iterate quickly.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary">
                View Projects
              </Link>
              <Link href="/about" className="btn-ghost">
                About &amp; Resume
              </Link>
              <Link href="/contact" className="btn-ghost">
                Contact
              </Link>

              <span className="ml-2 inline-flex items-center gap-2">
                <SocialIcons
                  github="https://github.com/rskirkwood"
                  linkedin="https://www.linkedin.com/in/riley-kirkwood"
                  size={22}
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-10">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>

        {/* Large featured drone project */}
        <div className="mt-4">
          <article className="card">
            <Link
              href="/projects/drone-orientation"
              className="hover:underline"
            >
              <h3 className="text-lg font-semibold">
                Drone Orientation Sensor Fusion (Capstone)
              </h3>
            </Link>
            <p className="mt-2 text-sm text-zinc-700">
              Jetson Nano + ROS system that fuses IMU and camera data with an
              Extended Kalman Filter to estimate roll, pitch, and yaw in real
              time. Compared to IMU-only and vision-only baselines, the EKF
              improves roll-angle accuracy by roughly 60% and 45% respectively,
              and significantly cleans up angle-rate estimates.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Due to an NDA, the code isn&apos;t public, but the architecture
              and results are documented on the project page.
            </p>
            <div className="mt-3">
              <div className="mt-4 text-sm">
                <Link
                  href="/projects/drone-orientation"
                  className="rounded-md border px-3 py-1 hover:bg-zinc-50"
                >
                  Details →
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Small cards (no drone duplicate) */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/projects"
            className="text-sm text-zinc-700 underline underline-offset-4"
          >
            See all projects →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
