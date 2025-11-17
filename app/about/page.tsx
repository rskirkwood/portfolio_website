import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main>
      <Nav />

      {/* Page header */}
      <section className="page-section">
        <h1 className="page-heading">About</h1>
        <p className="page-subtitle">
          I’m a Computer Engineering graduate who enjoys embedded systems, low-level
          programming, and building reliable software. I like clear goals, small iterations,
          and working with teams to ship things that actually get used.
        </p>
      </section>

      {/* Layout: two columns on desktop */}
      <section className="page-section grid gap-8 md:grid-cols-[2fr,1.4fr]">
        {/* Left column: summary + education */}
        <div className="space-y-6">
          {/* Summary card */}
          <div className="card">
            <h2 className="text-xl font-semibold">Who I am</h2>
            <p className="mt-3 text-zinc-700">
              I’m comfortable close to the hardware (C/C++, embedded Linux, microcontrollers)
              and increasingly at home on the software side (Python, data work, and backend-leaning
              projects). I enjoy understanding how pieces fit together end-to-end, from
              hardware and drivers up through the application and data layer.
            </p>
            <p className="mt-3 text-zinc-700">
              Teammates tend to lean on me for being adaptable and thoughtful: I ask good
              questions, document as I go, and don’t mind doing the less glamorous glue work
              that keeps projects moving.
            </p>
          </div>

          {/* Education + BYU logo */}
          <div className="card flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image
                  src="/images/byu-logo.png"
                  alt="Brigham Young University"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Education</h2>
              <p className="mt-1 text-sm font-medium text-zinc-800">
                B.S. in Computer Engineering
              </p>
              <p className="text-sm text-zinc-600">
                Brigham Young University · Graduated June 2025
              </p>
              <p className="mt-2 text-sm text-zinc-700">
                Focused on embedded systems, signal processing, and software development.
                Projects included Space Invaders on PYNQ, a BitTorrent-style file sharing
                system, a RISC-V game on FPGA, and a drone orientation estimator using a
                Kalman filter.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: skills + resume links */}
        <aside className="space-y-6">
          {/* Skills card */}
          <div className="card">
            <h2 className="text-xl font-semibold">Skills snapshot</h2>

            <div className="mt-4 space-y-3 text-sm text-zinc-700">
              <div>
                <h3 className="font-medium text-zinc-800">Languages</h3>
                <p>C / C++, Python, Java, MATLAB, Verilog</p>
              </div>
              <div>
                <h3 className="font-medium text-zinc-800">Tools & Frameworks</h3>
                <p>Git, Linux, Android Studio, pandas, matplotlib, FastAPI, tkinter</p>
              </div>
              <div>
                <h3 className="font-medium text-zinc-800">Systems & Concepts</h3>
                <p>
                  Embedded Systems, Signal Processing, Real-Time Systems, SDR,
                  Data Visualization, Software Testing
                </p>
              </div>
            </div>
          </div>

          {/* Resume card */}
          <div className="card">
            <h2 className="text-xl font-semibold">Resumes</h2>
            <p className="mt-2 text-sm text-zinc-700">
              Download the version that matches what you’re looking for. All of them are
              grounded in the same core experience; they just highlight different angles.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/resume/general.pdf" className="btn-ghost">
                General
              </Link>
              <Link href="/resume/embedded.pdf" className="btn-ghost">
                Embedded
              </Link>
              <Link href="/resume/software.pdf" className="btn-ghost">
                Software
              </Link>
              <Link href="/resume/it.pdf" className="btn-ghost">
                IT / Support
              </Link>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              (Place PDFs in <code>/public/resume</code> with these filenames.)
            </p>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
