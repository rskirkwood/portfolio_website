import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main>
      <Nav />

      <section className="page-section">
        <h1 className="page-heading">Contact</h1>

        <p className="page-subtitle">
          If you’d like to get in touch about a project, opportunity, or
          anything related to the work on this site, feel free to reach out. I’m
          always interested in connecting with people who enjoy building
          meaningful systems or solving interesting problems.
        </p>

        <div className="card mt-6">
          <p className="text-sm text-zinc-700">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:rskirkwood6@gmail.com"
              className="text-blue-600 underline underline-offset-2"
            >
              rskirkwood6@gmail.com
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
