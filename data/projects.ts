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
];
