import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "@/components/SocialIcons";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function HomePage() {
  const droneProject = projects.find((p) => p.slug === "drone-orientation");

  const desiredSmallSlugs = ["cfb-rankings", "sdr-telemetry"];
  const smallFeatured: typeof projects = [];

  desiredSmallSlugs.forEach((slug) => {
    const p = projects.find((proj) => proj.slug === slug);
    if (p) smallFeatured.push(p);
  });

  const excludedSlugs = new Set<string>([
    "drone-orientation",
    "5g-polarization",
    ...desiredSmallSlugs,
  ]);

  const extra = projects
    .filter((p) => !excludedSlugs.has(p.slug))
    .slice(0, 3 - smallFeatured.length);

  const smallCards = [...smallFeatured, ...extra];

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
              Hello, I&apos;m
            </p>

            <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
              Riley Kirkwood
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-700">
              I’m a computer engineering graduate who enjoys building new,
              reliable, and meaningful systems—whether that’s embedded hardware,
              signal processing pipelines, or full-stack tools. I like seeing
              how pieces fit together, learning quickly, and contributing to
              teams in a way that keeps projects moving forward.
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

              <div className="ml-2 inline-flex items-center gap-2">
                <SocialIcons
                  github="https://github.com/rskirkwood"
                  linkedin="https://www.linkedin.com/in/riley-kirkwood"
                  size={22}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="page-section">
        <h2 className="text-2xl font-semibold">Featured projects</h2>

        {droneProject && (
          <article className="card mt-4">
            <Link href={`/projects/${droneProject.slug}`}>
              <h3 className="text-lg font-semibold">{droneProject.title}</h3>
            </Link>

            <p className="mt-2 text-sm text-zinc-700">
              Jetson Nano + ROS system that fuses IMU and camera data with an
              Extended Kalman Filter to estimate roll, pitch, and yaw in real
              time. The EKF improves angle accuracy and dramatically smooths
              angle-rate estimates compared to IMU-only or vision-only baselines.
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Due to an NDA, the embedded code isn’t public, but the design and
              results are detailed on the project page.
            </p>

            <div className="mt-4 text-sm">
              <Link
                href={`/projects/${droneProject.slug}`}
                className="rounded-md border px-3 py-1 hover:bg-zinc-50"
              >
                Details →
              </Link>
            </div>
          </article>
        )}

        {/* Small Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {smallCards.map((p) => (
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
