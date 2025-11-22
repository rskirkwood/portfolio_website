// app/projects/drone-orientation/page.tsx

import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DroneOrientationProjectPage() {
  return (
    <main>
      <Nav />

      {/* Header */}
      <section className="page-section">
        <Link
          href="/projects"
          className="text-sm text-zinc-600 hover:text-zinc-800 underline underline-offset-4"
        >
          ← Back to Projects
        </Link>

        <h1 className="page-heading mt-4">Drone Orientation Sensor Fusion</h1>
        <p className="page-subtitle">
          Capstone project running on an NVIDIA Jetson Nano with ROS Melodic. I
          fused IMU and camera data using an Extended Kalman Filter (EKF) to
          estimate roll, pitch, and yaw in real time, with a focus on improving
          both angle and angle-rate accuracy compared to IMU-only and
          vision-only baselines.
        </p>
      </section>

      {/* Overview + results summary */}
      <section className="page-section">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
          {/* Left: overview / what I built */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold">High-level overview</h2>
              <p className="mt-3 text-sm text-zinc-700">
                The system runs on a Jetson Nano and uses ROS Melodic to tie
                together an IMU node, a camera processing node, and a
                sensor-fusion node. The EKF node publishes orientation
                (roll/pitch/yaw) at 30 Hz to a plotting node for live debugging
                and to CSV logs for offline analysis in MATLAB.
              </p>
              <p className="mt-3 text-sm text-zinc-700">
                We validated the system against a motion-tracking gimbal and a
                separate optical tracker. The gimbal was used as ground truth
                for overall roll-angle accuracy, while the tracker runs were
                used to look more closely at angle and angle-rate behavior on a
                trimmed segment of motion.
              </p>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold">What I built</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                <li>
                  C++ ROS nodes for IMU acquisition, camera processing, and EKF
                  sensor fusion on the Jetson Nano.
                </li>
                <li>
                  A custom ROS message for publishing roll, pitch, and yaw to a
                  plotting / logging node.
                </li>
                <li>
                  MATLAB scripts to align data sources in time, compute RMSE
                  for angle and angle-rate, and generate the plots used here.
                </li>
              </ul>
              <p className="mt-3 text-sm text-zinc-700">
                My main focus was the EKF design and tuning, plus the
                end-to-end validation pipeline that proved the system was a real
                improvement over IMU-only and computer-vision-only approaches.
              </p>
            </div>
          </div>

          {/* Right: numeric results */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold">Roll-angle accuracy</h2>
              <p className="mt-3 text-sm text-zinc-700">
                On the full gimbal dataset, roll-angle RMSE for each method was:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                <li>IMU-only: 7.4608° RMSE</li>
                <li>Vision-only (CV): 5.4304° RMSE</li>
                <li>EKF (IMU + CV): 3.0110° RMSE</li>
              </ul>
              <p className="mt-3 text-sm text-zinc-700">
                Going from IMU-only to the EKF reduces error by roughly{" "}
                <span className="font-semibold">60%</span>, and going from
                vision-only to the EKF reduces error by about{" "}
                <span className="font-semibold">45%</span>. The EKF combines the
                responsiveness of the IMU with the long-term stability of the
                camera.
              </p>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold">Angle-rate accuracy</h2>
              <p className="mt-3 text-sm text-zinc-700">
                For a trimmed tracker run, I compared roll angle and roll
                angle-rate (degrees/second) between the EKF and the tracker
                reference:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                <li>Roll angle RMSE: 0.7134°</li>
                <li>Roll angle-rate RMSE: 5.2121°/s</li>
              </ul>
              <p className="mt-3 text-sm text-zinc-700">
                These tests show that the EKF not only improves static
                orientation accuracy, but also produces smooth, responsive
                angle-rate estimates suitable for real-time control or
                stabilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture + EKF diagrams */}
      <section className="page-section">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)]">
          <div className="card">
            <h2 className="text-lg font-semibold">System architecture</h2>
            <p className="mt-3 text-sm text-zinc-700">
              A Jetson Nano runs ROS Melodic with separate nodes for:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>IMU acquisition (accelerometer + gyroscope)</li>
              <li>Camera frame capture and feature extraction</li>
              <li>EKF sensor-fusion node</li>
              <li>Plotting / logging node for live debugging</li>
            </ul>
            <p className="mt-3 text-sm text-zinc-700">
              Orientation estimates are published as a custom ROS message so
              downstream nodes (like visualization or control) can subscribe
              without knowing the internal details of the fusion algorithm.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border bg-white">
              <Image
                src="/drone/system-architecture.svg"
                alt="System architecture diagram for the drone orientation project"
                width={1400}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold">Extended Kalman Filter</h2>
            <p className="mt-3 text-sm text-zinc-700">
              The EKF prediction step integrates gyro rates to propagate the
              current orientation estimate. The update step uses a combination
              of accelerometer measurements (for gravity) and visual tracking
              (for drift correction) to pull the estimate back toward reality.
            </p>
            <p className="mt-3 text-sm text-zinc-700">
              This design gives us the short-term responsiveness of the gyro
              with the long-term stability of the camera and gravity vector,
              which is exactly what you want for drone orientation.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border bg-white">
              <Image
                src="/drone/kalman-filter.svg"
                alt="Kalman filter block diagram used for sensor fusion"
                width={1400}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results with comparison plots */}
      <section className="page-section">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)]">
          <div className="card">
            <h2 className="text-lg font-semibold">
              Baseline: IMU vs gimbal (roll)
            </h2>
            <p className="mt-3 text-sm text-zinc-700">
              This plot compares the raw IMU-derived roll estimate against the
              gimbal reference. You can see the IMU track the general motion but
              with noticeable drift, noise, and a large error when the motion
              stops.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border bg-white">
              <Image
                src="/drone/imu-compare-roll.png"
                alt="Comparison of gimbal roll data and IMU-only roll estimate"
                width={1200}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold">
              EKF: Kalman vs gimbal (roll)
            </h2>
            <p className="mt-3 text-sm text-zinc-700">
              After applying the EKF, the roll estimate hugs the gimbal
              reference much more tightly across the full trajectory and
              settles cleanly when motion stops. This is the same dataset as
              the IMU plot, but with sensor fusion applied.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border bg-white">
              <Image
                src="/drone/kf-compare-roll.png"
                alt="Comparison of gimbal roll data and EKF (Kalman) roll estimate"
                width={1200}
                height={800}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Code / NDA + what I learned */}
      <section className="page-section">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
          <div className="card">
            <h2 className="text-lg font-semibold">What I learned</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
              <li>
                Designing and tuning an Extended Kalman Filter for real sensor
                data (noise, bias, drift, and lag).
              </li>
              <li>
                Time-aligning asynchronous data sources (IMU, camera, tracker)
                and validating them against hardware ground truth.
              </li>
              <li>
                Building ROS-based systems on embedded Linux and defining custom
                messages for real-time orientation data.
              </li>
              <li>
                Using quantitative metrics like RMSE for both angle and
                angle-rate to prove that algorithm changes actually improve
                performance.
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold">Code availability (NDA)</h2>
            <p className="mt-3 text-sm text-zinc-700">
              Due to an NDA, I can&apos;t publish the full project code or
              firmware for this system on GitHub. However, the architecture,
              algorithms, and performance results shown here are all fair game
              to discuss.
            </p>
            <p className="mt-3 text-sm text-zinc-700">
              In an interview or technical conversation, I&apos;m happy to walk
              through the EKF design, ROS node graph, and validation process in
              as much detail as you&apos;d like.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
