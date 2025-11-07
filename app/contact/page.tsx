import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <section className="py-12">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="mt-4 text-zinc-700">
          Best way to reach me: <a className="underline" href="mailto:youremail@example.com">youremail@example.com</a>
        </p>
        <div className="mt-6 flex gap-4 text-sm text-zinc-700">
          <a className="underline" href="https://github.com/yourhandle" target="_blank" rel="noreferrer">GitHub</a>
          <a className="underline" href="https://www.linkedin.com/in/yourhandle" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}