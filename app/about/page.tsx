import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main>
      <Nav />

      <section className="page-section">
      <div className="grid gap-6 items-center md:grid-cols-[minmax(0,2fr)_auto]">
        <div>
          <h1 className="page-heading">About</h1>
          <p className="page-subtitle">
            I&apos;m a computer engineering graduate from BYU with a minor in
            mathematics. I enjoy building practical systems across embedded
            development, SDR/signal processing, and full-stack tools. I like
            understanding how a project fits together end-to-end and being the
            reliable person who keeps things moving forward.
          </p>
        </div>

        {/* Larger, centered profile image */}
        <div className="flex justify-center md:justify-center">
          <div className="relative h-40 w-40 md:h-44 md:w-44 overflow-hidden 
            rounded-full border border-zinc-200 bg-zinc-50 shadow-sm">
            <Image
              src="/images/profile.jpg"
              alt="Riley Kirkwood"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>


      {/* Layout: two columns on desktop */}
      <section className="page-section grid gap-8 md:grid-cols-[2fr,1.4fr]">
        {/* Left column: summary + education + resumes */}
        <div className="space-y-6">
          {/* Summary card */}
          <div className="card">
            <h2 className="text-xl font-semibold">Who I am</h2>
            <p className="mt-3 text-sm text-zinc-700">
              I&apos;m most comfortable working close to the hardware
              (C/C++, embedded systems, SDRs) but I also enjoy <wbr></wbr> on the 
              software side (Python, data work, and web/back-end projects). I like 
              seeing how all the pieces of a system fit together, not just one layer 
              in isolation.
            </p>
            <p className="mt-3 text-sm text-zinc-700">
              Before college, I spent two years serving a mission in the greater
              Nashville area for the Church of Jesus Christ of Latter-day
              Saints. That experience taught me how to work with people from all
              kinds of backgrounds, stay calm under pressure, and keep showing
              up even when things are hard.
            </p>
            <p className="mt-3 text-sm text-zinc-700">
              A few things that describe how I approach work:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>
                I learn quickly and like figuring out systems I haven&apos;t
                seen before.
              </li>
              <li>
                I prefer clean, straightforward solutions over clever
                complexity.
              </li>
              <li>
                I&apos;m happy doing behind-the-scenes glue work that keeps
                everything stable.
              </li>
              <li>
                I don&apos;t always remember every small syntax detail, but I&apos;m
                good at finding examples, reading docs, and getting to a working
                solution quickly.
              </li>
            </ul>
          </div>

          {/* Education with BYU logo next to heading */}
          <div className="card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Education</h2>

            {/* Rectangular BYU logo */}
            <div className="h-10 w-auto items-center flex">
              <Image
                src="/images/byu-logo.png"
                alt="Brigham Young University"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          <p className="mt-3 text-sm font-medium text-zinc-800">
            B.S. in Computer Engineering, Minor in Mathematics
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
          <p className="mt-2 text-sm text-zinc-700">
            <span className="font-medium">Selected coursework:</span>{" "}
            Embedded Systems, Digital Signal Processing, Computer Networks, Operating
            Systems, Probability &amp; Statistics, Linear Algebra, and Data Structures
            &amp; Algorithms.
          </p>
        </div>


          {/* Resumes */}
          <div className="card max-w-3xl">
            <h2 className="text-xl font-semibold">Resumes</h2>
            <p className="mt-2 text-sm text-zinc-700">
              Download the version that matches what you&apos;re looking for.
              They all draw from the same core experience; each one just
              emphasizes a different angle.
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
          </div>
        </div>

        {/* Right column: skills + how I work + what I'm looking for */}
        <aside className="space-y-6">
          {/* Skills card */}
          <div className="card">
            <h2 className="text-xl font-semibold">Skills snapshot</h2>

            <div className="mt-4 space-y-3 text-sm text-zinc-700">
              <div>
                <h3 className="font-medium text-zinc-800">Advanced</h3>
                <p className="mt-1">
                  C / C++, Python, MATLAB, SDR / RF systems, core signal
                  processing concepts
                </p>
              </div>
              <div>
                <h3 className="font-medium text-zinc-800">Intermediate</h3>
                <p className="mt-1">
                  ROS, FPGA / RTL / PYNQ, Machine Learning, Java
                </p>
              </div>
              <div>
                <h3 className="font-medium text-zinc-800">Beginner</h3>
                <p className="mt-1">
                  JavaScript, TypeScript, React, Next.js, REST APIs, SQL, Docker
                </p>
              </div>
              <div>
                <h3 className="font-medium text-zinc-800">Interested in</h3>
                <p className="mt-1">
                  AWS, Rust, Go, CI/CD, Kubernetes, and data engineering tools
                  like Spark and Airflow
                </p>
              </div>
            </div>
          </div>

          {/* How I work card */}
          <div className="card">
            <h2 className="text-xl font-semibold">How I work</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>
                I like being involved across multiple parts of a project instead
                of staying in a narrow slice.
              </li>
              <li>
                I enjoy working with teammates, sharing context, and figuring
                out tradeoffs together.
              </li>
              <li>
                I&apos;m good at going from &quot;no idea where to start&quot; to
                a rough prototype and then iterating until it&apos;s solid.
              </li>
            </ul>
          </div>

          {/* What I'm looking for */}
          <div className="card">
            <h2 className="text-xl font-semibold">What I&apos;m looking for</h2>
            <p className="mt-2 text-sm text-zinc-700">
              In the long run, my main goal in life isn&apos;t just about my
              career, it&apos;s to be a good husband and father and to be able to
              care and provide for a family. From a career perspective,
              I&apos;m especially excited about roles where I can:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>
                Work on embedded or firmware systems using C/C++, Python and real
                hardware.
              </li>
              <li>
                Build data-heavy tools or back-end services that make other
                engineers&apos; lives easier.
              </li>
              <li>
                Join teams that value ownership, clear communication, and
                long-term maintainability.
              </li>
              <li>
                An opportunity to learn and grow my skills over time through working
                on meaningful projects.
              </li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Personal Interests*/}
      <section className="page-section">
        <div className="card">
          <div className="grid gap-6 items-start md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
            {/* Left side: heading + text */}
            <div className="space-y-4 text-sm text-zinc-700">
              <h2 className="text-xl font-semibold">Personal interests</h2>

              <div>
                <h3 className="font-medium text-zinc-800">Gaming</h3>
                <p className="mt-1">
                  I lean toward co-op and team-based games where
                  communication and strategy matter (games like Destiny 2, ARC
                  Raiders, Marvel Rivals, Rocket League, and Rainbow Six Siege).
                  I like the mix of problem-solving and teamwork they require.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-zinc-800">
                  Sports &amp; outdoors
                </h3>
                <p className="mt-1">
                  I enjoy disc golf, pickleball, basketball, and ultimate
                  frisbee. I also follow football, especially college with the BYU
                  Cougars and the Washington Huskies but I also follow the NFL well 
                  enought to keep up with the Seahawks and my fantasy team. Hiking, 
                  camping, and being outside are also great ways to recharge.
                </p>
              </div>
            </div>

            {/* Right side: collage image */}
            <div className="flex items-start justify-center md:justify-end">
              <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden bg-zinc-50">
                <Image
                  src="/images/website-collage.jpg"
                  alt="Collage of a few things I enjoy outside of engineering."
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
