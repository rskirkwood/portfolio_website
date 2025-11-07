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
    slug: "college-football-analytics",
    title: "College Football Analytics & Rankings",
    summary:
      "Data pipeline + custom ranking metrics. Next step: weekly auto-refresh and publish to this site.",
    tech: ["Python", "pandas", "NumPy", "Next.js", "TypeScript"],
    highlights: [
      "Pulled 3.6k+ game records and computed strength metrics",
      "Drafted ranking algorithm and experiment harness",
      "Planned automations for weekly data refresh",
    ],
    repo: "https://github.com/yourhandle/your-cfb-repo",
  },
];