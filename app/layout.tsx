import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
    title: "Riley Kirkwood – Portfolio",
    description: "Embedded & software projects, resume, and contact.",
    openGraph: {
        title: "Riley Kirkwood – Portfolio",
        description: "Embedded & software projects, resume, and contact.",
        url: "https://your-portfolio-url.vercel.app",
        siteName: "Riley Kirkwood",
        type: "website",
},
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-white text-zinc-900 antialiased">
                <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
                    {children}
                </div>
            </body>
        </html>
    );
}
