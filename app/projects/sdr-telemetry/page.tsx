// app/projects/sdr-telemetry/page.tsx

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function SdrTelemetryPage() {
  return (
    <main>
      <Nav />

      <section className="page-section">
        <h1 className="page-heading">
          SDR Telemetry Research &amp; Signal Processing Implementation
        </h1>
        <p className="page-subtitle">
          Work on high-rate aeronautical telemetry receivers using
          commercial-off-the-shelf SDRs. I wrote the C host-side DSP and SDR
          interface code that made it possible to reliably demodulate SOQPSK-TG
          telemetry at multi-megabit rates and push an Ettus USRP X410 up to
          8.192 Mb/s.
        </p>
      </section>

      <section className="page-section">
        <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              My role
            </h2>
            <p className="mt-2 text-sm text-zinc-700">
              I worked as an undergraduate research assistant and co-author on a
              multi-year series of projects evaluating and improving
              software-defined radio receivers for aeronautical telemetry. My
              main contributions were:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>
                Implementing C-based SDR interfaces to capture raw I/Q samples
                over UDP from radios like the USRP X410 and Lumistar SMR-7522.
              </li>
              <li>
                Writing host-side DSP code: automatic gain control (AGC),
                resampling, timing recovery, packet framing, and interfacing to
                a Lumistar LS-68 and BER tester.
              </li>
              <li>
                Setting up the full hardware chain, automating BER experiments,
                and collecting data to compare radios and quantify maximum
                usable bit rates.
              </li>
              <li>
                Contributing to MATLAB analysis scripts and figures, and
                co-authoring multiple conference papers based on this work.
              </li>
            </ul>
          </div>

          <figure className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="/sdr-telemetry/sdr-telemetry-setup-photo.jpg"
                alt="Overhead view of the telemetry SDR lab setup with USRP, SMR-7522, LS68, attenuators, and Riley operating a laptop."
                width={900}
                height={600}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-zinc-600">
              Experimental setup used for the SDR telemetry bakeoff: USRP X410,
              Lumistar SMR-7522, LS-68 interface, programmable attenuator, and
              BER tester. I implemented the host-side C code that ties this
              chain together.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* System architecture */}
      <section className="page-section">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          System architecture
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          The goal was to evaluate how far we could push COTS SDRs in an
          aeronautical telemetry role compared to purpose-built receivers. The
          system used a telemetry transmitter, RF distribution and attenuation,
          SDR-based receivers, and a Lumistar LS-68 telemetry interface feeding
          a BER tester.
        </p>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <figure className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="/sdr-telemetry/sdr-telemetry-system-diagram-p1.png"
                alt="Block diagram showing telemetry transmitter, splitters, attenuator, SDR, and host PC for the aeronautical telemetry testbed."
                width={1200}
                height={700}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-zinc-600">
              RF front-end and SDR path for the telemetry testbed. The SDR
              captures I/Q samples over Ethernet and streams them to a host PC
              for C-based processing.
            </figcaption>
          </figure>

          <figure className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="/sdr-telemetry/sdr-telemetry-system-diagram-p2.png"
                alt="Block diagram showing host processing, microcontroller, LS-68 interface, and BER tester used with the SDR receiver."
                width={1200}
                height={700}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-zinc-600">
              Host processing chain: C DSP blocks running on the PC generate a
              reconstructed bitstream, which is then sent to a microcontroller,
              LS-68 interface, and BER tester for validation.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* DSP implementation */}
      <section className="page-section">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          C-based SDR &amp; DSP implementation
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          On the host, I implemented a real-time processing chain in C to keep
          up with multi-megabit SOQPSK-TG signals. The pipeline:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>
            Receives I/Q packets over UDP from the SDR and unpacks them into
            contiguous sample buffers.
          </li>
          <li>
            Applies automatic gain control (AGC) and filtering to normalize
            signal levels.
          </li>
          <li>
            Uses a variable resampler and timing-recovery loop to align samples
            with the symbol rate imposed by the telemetry waveform.
          </li>
          <li>
            Performs symbol detection and builds packets that feed into the
            LS-68 and BER tester.
          </li>
        </ul>
        <p className="mt-3 text-sm text-zinc-700">
          We profiled each subroutine (extract, AGC, resample, detect, send) to
          ensure the pipeline met real-time constraints for different radios and
          bit rates.
        </p>
      </section>

      {/* Results */}
      <section className="page-section">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Results
        </h2>

        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <figure className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="/sdr-telemetry/sdr-telemetry-past-results.png"
                alt="Baseline BER versus received power curves comparing SMR and USRP receivers before host-side DSP improvements."
                width={1200}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-zinc-600">
              Baseline BER performance for SMR-7522 and USRP X410 receivers
              before optimizing the host-side processing chain. These results
              motivated a deeper focus on C implementation and throughput.
            </figcaption>
          </figure>

          <figure className="space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
              <Image
                src="/sdr-telemetry/sdr-telemetry-ber-8192.png"
                alt="BER versus received power curve for the USRP X410 at 8.192 Mbps."
                width={1200}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-zinc-600">
              Final BER curve for the USRP X410 at 8.192 Mb/s. After removing
              bottlenecks and optimizing the C DSP code, the SDR-based receiver
              could maintain reliable synchronization and low BER at more than
              double the earlier bit-rate limit.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Publications & links */}
      <section className="page-section">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          Publications based on this work
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          These projects led to several conference publications. I&apos;m listed
          as a co-author on all of them.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-zinc-700">
          <li>
            “Exploring Maximum Bit Rates for Software Defined Radios in
            Aeronautical Telemetry,” International Telemetering Conference
            Proceedings, 2024.{" "}
            <a
              href="http://hdl.handle.net/10150/675413"
              target="_blank"
              rel="noreferrer"
              className="link-accent"
            >
              hdl:10150/675413
            </a>
          </li>
          <li>
            “A Comparison of Two Software Defined Radios for Aeronautical
            Telemetry,” International Telemetering Conference Proceedings, 2023.{" "}
            <a
              href="http://hdl.handle.net/10150/670459"
              target="_blank"
              rel="noreferrer"
              className="link-accent"
            >
              hdl:10150/670459
            </a>
          </li>
          <li>
            “An Experiment with Polarization Diversity Combining for Aeronautical
            Mobile Telemetry,” International Telemetering Conference
            Proceedings, 2022.{" "}
            <a
              href="http://hdl.handle.net/10150/666931"
              target="_blank"
              rel="noreferrer"
              className="link-accent"
            >
              hdl:10150/666931
            </a>
          </li>
        </ul>
        <p className="mt-3 text-xs text-zinc-500">
          The SDR code was developed as part of a research lab and can&apos;t be
          publicly shared, but the algorithms, architecture, and results are
          summarized here and in the linked papers.
        </p>
      </section>

      <Footer />
    </main>
  );
}
