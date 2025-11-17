export type Project = {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  highlights: string[];
  repo?: string;
  demo?: string;
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
  },
];