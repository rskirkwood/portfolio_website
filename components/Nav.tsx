import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 -mx-4 mb-8 border-b bg-white/80 px-4 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between py-3">
        {/* Logo + name */}
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold hover:opacity-90"
        >
          <Image
            src="/icon.png"
            alt="Riley Kirkwood logo"
            width={32}
            height={32}
            className="rounded-md"
            priority
          />
          <span>Riley Kirkwood</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/projects"
            className="rounded-md px-2 py-1 hover:bg-[var(--theme-blue)]"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="rounded-md px-2 py-1 hover:bg-[var(--theme-blue)]"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-md px-2 py-1 hover:bg-[var(--theme-blue)]"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
