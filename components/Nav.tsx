import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 -mx-4 mb-8 border-b bg-white/80 px-4 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between py-3">
        <Link href="/" className="font-semibold">Riley Kirkwood</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </nav>
    </header>
  );
}