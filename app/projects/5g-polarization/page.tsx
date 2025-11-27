// app/projects/5g-polarization/page.tsx

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function FiveGPolarizationPage() {
  return (
    <main>
      <Nav />

      <section className="page-section">
        <h1 className="page-heading">
          5G / IoT Polarization Diversity Measurement System
        </h1>
        <p className="page-subtitle">
          SDR-based channel sounding system used to study polarization diversity
          in the 3.7–3.98 GHz band for dense indoor IoT and 5G-style
          deployments. I helped build the measurement setup, capture channel
          responses, and analyze how polarization affects diversity performance.
        </p>
      </section>

      <section className="page-section">
        <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              My role
            </h2>
            <p className="mt-2 text-sm text-zinc-700">
              I contributed as an undergraduate research assistant and co-author
              on this project, focused on 5G-and-beyond IoT networks. My
              responsibilities included:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>
                Helping configure the SDR-based channel sounding system
                (ADALM-PLUTO and USRP X410) and rotating transmit antenna.
              </li>
              <li>
                Running measurement campaigns across different polarization
                states and locations in representative indoor environments.
              </li>
              <li>
                Working with MATLAB and Python scripts to process captured
                channels, compute power delay profiles, and derive diversity
                metrics.
              </li>
              <li>
                Assisting with figure validation and interpretation for the
                publication.
              </li>
            </ul>
          </div>

          <figure className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="/5g-polarization/iot-polarization-system-diagram.png"
                alt="Block diagrams of the 5G IoT polarization measurement setup, including variable-polarization transmitter, dual-polarized receive antennas, hybrid coupler, and SDR-based acquisition system."
                width={1200}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-zinc-600">
              Measurement setup: a variable-polarization transmitter in the
              3.7–3.98 GHz band and dual-polarized receive antennas connected to
              an SDR-based acquisition system implemented with a USRP X410.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Results */}
      <section className="page-section">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          What we measured
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          The core idea was to see how different polarization pairs behave in a
          realistic indoor IoT environment and whether circular polarization
          offers better diversity than purely linear channels. We rotated the
          transmit antenna through a range of angles and recorded the resulting
          channels for various polarization combinations.
        </p>

        <div className="mt-5 grid gap-8 md:grid-cols-2">
          <figure className="space-y-3 md:col-span-2">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="/5g-polarization/iot-polarization-envelope-corr.png"
                alt="Plots of envelope correlation versus transmit rotation angle for different polarization combinations."
                width={1200}
                height={800}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-zinc-600">
              Envelope correlation between receive channels as a function of
              transmit polarization angle. Circularly polarized channels stay
              relatively uncorrelated across rotation, indicating strong
              diversity potential compared to highly correlated linear
              polarization pairs.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Publication */}
      <section className="page-section">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Publication
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          This work was published and presented at a regional engineering
          conference:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
          <li>
            &quot;On Polarization Diversity in 5G and Beyond Internet of-Things
            Networks,&quot; 2023 Intermountain Engineering, Technology and
            Computing (IETC), 2023.{" "}
            <a
              href="https://doi.org/10.1109/IETC57902.2023.10152026"
              target="_blank"
              rel="noreferrer"
              className="link-accent"
            >
              doi:10.1109/IETC57902.2023.10152026
            </a>
          </li>
        </ul>
        <p className="mt-3 text-xs text-zinc-500">
          As with other lab projects, the measurement and processing code is
          not publicly available, but the methodology and key findings are
          summarized here and in the linked paper.
        </p>
      </section>

      <Footer />
    </main>
  );
}
