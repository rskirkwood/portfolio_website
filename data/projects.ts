// src/data/projects.ts

export type ProjectType = "Personal" | "School" | "Work";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  highlights: string[];
  repo?: string;
  demo?: string;

  // NEW structured tag fields
  type?: ProjectType;   // Personal / School / Work
  year?: string;        // "2024", "2025", "ongoing", etc.
  concepts?: string[];  // "embedded", "web APIs", "sensor fusion", ...
  languages?: string[]; // "Python", "C++", "TypeScript", ...
};

export const projects: Project[] = [
  {
    slug: "cfb-rankings",
    title: "College Football Analytics & Rankings",
    summary:
      "Unbiased FBS ranking system based purely on who you beat and who you lose to, using win/loss-based scoring and normalized strength of schedule.",
    tech: ["Python", "pandas", "NumPy", "Next.js", "TypeScript"],
    highlights: [
      "Pulled 3.6k+ game records and computed strength metrics",
      "Drafted ranking algorithm and experiment harness",
      "Planned automations for weekly data refresh",
    ],
    repo: "https://github.com/rskirkwood/cfb_rankings",

    type: "Personal",
    year: "2025",
    concepts: ["Analytics", "Data", "APIs"],
    languages: ["Python", "TypeScript"],
  },
  {
    slug: "drone-orientation",
    title: "Drone Orientation Sensor Fusion (Capstone)",
    summary:
      "Jetson Nano + ROS system that fuses IMU and camera data with an Extended Kalman Filter to estimate roll, pitch, and yaw in real time, reducing roll-angle error by ~60% vs IMU-only and ~45% vs vision-only.",
    tech: ["C++", "Python", "ROS Melodic", "Jetson Nano", "MATLAB"],
    highlights: [
      "Implemented C++ ROS nodes for IMU, camera processing, and EKF sensor fusion on Jetson Nano",
      "Designed and tuned an Extended Kalman Filter to combine IMU and vision measurements for roll/pitch/yaw",
      "Validated the system against a motion-tracking gimbal and optical tracker using MATLAB RMSE analysis",
      "Documented architecture and results; code cannot be shared publicly due to NDA",
    ],

    type: "School",
    year: "2024",
    concepts: ["Embedded", "Sensor Fusion", "Control"],
    languages: ["C++", "Python", "MATLAB"],
  },
  {
    slug: "sdr-telemetry",
    title: "SDR Telemetry Research & Signal Processing Implementation",
    summary:
      "Work on high-rate aeronautical telemetry receivers using COTS SDRs. I wrote the C host-side DSP and SDR interface code that enabled multi-Mbps SOQPSK-TG links and pushed an Ettus USRP X410 up to 8.192 Mb/s.",
    tech: ["C", "Python", "MATLAB", "Ettus USRP X410", "Lumistar SMR-7522"],
    highlights: [
      "Implemented C-based SDR interface code to capture raw I/Q streams over UDP and parse them into usable sample buffers.",
      "Wrote host-side DSP blocks including AGC, timing/resampling, and packet framing for real-time SOQPSK-TG demodulation.",
      "Ran and automated BER experiments to compare SDRs and quantify maximum usable bit rates for aeronautical telemetry.",
      "Co-authored multiple conference papers based on this work for the International Telemetering Conference.",
    ],

    type: "Work",
    year: "2022–2024",
    concepts: ["SDR", "Signal Processing", "Telemetry", "Embedded"],
    languages: ["C", "Python", "MATLAB"],
  },
  {
    slug: "5g-polarization",
    title: "5G / IoT Polarization Diversity Measurement System",
    summary:
      "Measurement campaign using SDRs to characterize polarization diversity in the 3.7–3.98 GHz band for dense IoT and 5G-style indoor deployments.",
    tech: ["MATLAB", "Python", "PlutoSDR", "Ettus USRP X410"],
    highlights: [
      "Helped build an SDR-based channel sounding system with a rotating transmit antenna and dual-polarized receive antennas.",
      "Captured and processed channel responses for linear and circular polarizations in realistic indoor environments.",
      "Analyzed cross-polarization discrimination and envelope correlation to quantify diversity benefits.",
      "Co-authored a conference paper presented at IETC on polarization diversity for 5G-and-beyond IoT networks.",
    ],

    type: "Work",
    year: "2023",
    concepts: ["SDR", "5G", "RF Measurements", "Channel Modeling"],
    languages: ["MATLAB", "Python"],
  },
];
