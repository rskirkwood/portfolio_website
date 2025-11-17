import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";

export default function ContactPage() {
  return (
    <main>
      <Nav />

      {/* Page header */}
      <section className="page-section">
        <h1 className="page-heading">Contact</h1>
        <p className="page-subtitle">
          The fastest way to reach me is by email. I’m open to roles in embedded engineering,
          backend/full-stack development, data-leaning work, or technical support/IT where
          I can grow into more engineering responsibilities.
        </p>
      </section>

      {/* Contact card */}
      <section className="page-section">
        <div className="card max-w-xl">
          <h2 className="text-xl font-semibold">Say hello</h2>

          <p className="mt-3 text-zinc-700">
            Email is best for anything related to job opportunities, project ideas, or
            questions about my work.
          </p>

          <p className="mt-4 text-sm">
            <span className="font-medium text-zinc-800">Email: </span>
            <a
              href="mailto:rskirkwood6@gmail.com"
              className="link-accent"
            >
              rskirkwood6@gmail.com
            </a>
          </p>

          <div className="mt-6 border-t pt-4">
            <p className="text-sm font-medium text-zinc-800">
              Elsewhere on the internet
            </p>
            <div className="mt-3 flex items-center gap-3 text-sm text-zinc-700">
              <SocialIcons
                github="https://github.com/rskirkwood"
                linkedin="https://www.linkedin.com/in/riley-kirkwood"
                size={22}
              />
              <span className="text-xs text-zinc-500">
                GitHub for code • LinkedIn for professional updates
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
