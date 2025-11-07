import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <section className="py-12">
        <h1 className="text-3xl font-semibold">About</h1>
        <div className="mt-4 max-w-2xl space-y-4 text-lg text-zinc-700">
          <p>
            I’m a Computer Engineering grad focused on embedded systems, with growing interest
            in backend/full‑stack and data analytics. I like clear goals, small iterations,
            and shipping.
          </p>
          <p>
            Teamwork and adaptability are strengths. I enjoy jumping into unfamiliar codebases,
            asking good questions, and getting blockers out of the way.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Skills (short list)</h2>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <li className="rounded-xl border p-3">C / C++</li>
          <li className="rounded-xl border p-3">Python</li>
          <li className="rounded-xl border p-3">Embedded (Raspberry Pi, microcontrollers)</li>
          <li className="rounded-xl border p-3">Git / GitHub</li>
          <li className="rounded-xl border p-3">SQL basics</li>
          <li className="rounded-xl border p-3">Data analysis (pandas, NumPy)</li>
          <li className="rounded-xl border p-3">Basics: HTML, CSS, JS/TS</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">Resume</h2>
        <p className="mt-2 text-zinc-700">Download the version you need:</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/resume/general.pdf" className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50">General</Link>
          <Link href="/resume/embedded.pdf" className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50">Embedded</Link>
          <Link href="/resume/software.pdf" className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50">Software</Link>
          <Link href="/resume/it.pdf" className="rounded-xl border px-4 py-2 text-sm hover:bg-zinc-50">IT/Support</Link>
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          (Drop your PDFs into <code>/public/resume</code> with the above filenames.)
        </p>
      </section>
      <Footer />
    </main>
  );
}