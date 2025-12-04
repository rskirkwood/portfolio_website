import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { CfbRankingsPayload } from "@/data/cfb_rankings";

function loadRankings(): CfbRankingsPayload | null {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "cfb_rankings.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as CfbRankingsPayload;
  } catch (err) {
    console.error("Failed to read cfb_rankings.json:", err);
    return null;
  }
}

export default function CfbRankingsPage() {
  const data = loadRankings();

  return (
    <main>
      <Nav />

      <section className="page-section">
        <Link
          href="/projects"
          className="text-sm text-zinc-600 hover:text-zinc-800 underline underline-offset-4"
        >
          ← Back to Projects
        </Link>

        <h1 className="page-heading mt-4">College Football Rankings</h1>

        {data ? (
          <>
            <p className="page-subtitle">
              {data.year} FBS-only rankings driven entirely by wins, losses, and who
              you played. Teams are rewarded for beating opponents with strong
              records, penalized for bad losses, and adjusted for conference strength.
              No style points, no preseason hype, just results.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Last updated: {data.lastUpdated}
            </p>
          </>
        ) : (
          <p className="page-subtitle">
            Rankings data could not be loaded. This may be due to missing or
            out-of-date ranking files.
          </p>
        )}
      </section>

      {data && (
        <section className="page-section">
          {/* Two-column layout: left = explanation, right = table */}
          <div className="lg:flex lg:items-start lg:gap-6">
            {/* Left: explanation cards */}
            <div className="w-full lg:w-[50%] space-y-6 mb-6 lg:mb-0">
              <div className="card">
                <h2 className="text-lg font-semibold">How the score works</h2>
                <p className="mt-3 text-sm text-zinc-700">
                  For each completed game, the winner earns points equal to the
                  opponent&apos;s current total wins, and the loser loses points
                  equal to the opponent&apos;s current total losses.
                </p>
                <p className="mt-3 text-sm text-zinc-700">
                  Wins over Power-conference and Independent FBS teams receive full
                  credit. Wins over Group-of-6 FBS teams (AAC, MW, MAC, C-USA,
                  Sun Belt, and the modern Pac-12) are slightly discounted. Wins over
                  FCS teams don&apos;t add positive points at all, but losses to FCS
                  teams are fully penalized.
                </p>
                <p className="mt-3 text-sm text-zinc-700">
                  Raw points are divided by FBS games played to get a normalized
                  score, so teams are compared on a per–FBS-game basis. Scheduling
                  tough FBS opponents is rewarded, loading up on cupcakes is not.
                </p>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold">Why I built this</h2>
                <p className="mt-3 text-sm text-zinc-700">
                  I&apos;m a BYU fan, and watching the CFP rankings has been…
                  frustrating. It often feels like certain teams are boosted or
                  punished based more on brand, logo, and conference than on what
                  actually happened on the field. Media narratives and preseason
                  expectations stick around long after the games say otherwise.
                </p>
                <p className="mt-3 text-sm text-zinc-700">
                  This ranking is intentionally simple and a bit stubborn: a win is a
                  win, and a loss is a loss. It doesn&apos;t care about margin of
                  victory, turnovers, weather, injuries, or home-field advantage.
                  It doesn&apos;t try to guess &quot;who would beat whom on a
                  neutral field&quot; the way FPI or committee logic does. It just
                  asks: <span className="italic">who did you beat, and how good are
                  those teams?</span>
                </p>
                <p className="mt-3 text-sm text-zinc-700">
                  It&apos;s not meant to be the final word on who should make the
                  playoff, but it is meant to highlight how different things look
                  when you strip away brand bias and focus on results.
                </p>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold">What I built</h2>
                <p className="mt-3 text-sm text-zinc-700">
                  This project started as a simple results-only ranking model, but I
                  ended up building a small analytics pipeline around it:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                  <li>
                    A data pipeline that pulls game results, records, and team info
                    from the collegefootballdata.com API and filters everything down
                    to FBS teams.
                  </li>
                  <li>
                    A ranking engine that walks every FBS game, applies
                    conference-aware weights, calculates points based on opponents’
                    wins and losses, and normalizes the score by FBS games played.
                  </li>
                  <li>
                    An export step that generates a full CSV plus a compact JSON file
                    used on this page, including team names, conferences, mascots,
                    logos, and scores.
                  </li>
                </ul>
                <p className="mt-3 text-sm text-zinc-700">
                  It’s a lightweight system—no machine learning, no margins or
                  efficiency metrics yet—just a clean way to turn results into
                  rankings.
                </p>
                <p className="mt-3 text-xs text-zinc-500">
                  Code:{" "}
                  <a
                    href="https://github.com/rskirkwood/cfb_rankings"
                    target="_blank"
                    rel="noreferrer"
                    className="link-accent"
                  >
                    github.com/rskirkwood/cfb_rankings
                  </a>
                </p>
              </div>
            </div>

            {/* Right: rankings table */}
            <div className="w-full lg:w-[50%] card overflow-x-auto">
              <h2 className="text-xl font-semibold">Top 25 (FBS)</h2>
              <table className="mt-4 min-w-full border-separate border-spacing-y-1 text-sm">
                <thead className="text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="text-left">Rank</th>
                    <th className="text-left">Team</th>
                    <th className="text-left">Conf</th>
                    <th className="text-right">Score</th>
                    <th className="text-right">Record</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top25.map((row) => (
                    <tr key={row.rank}>
                      <td className="py-0.5 pr-3 text-zinc-700">{row.rank}</td>
                      <td className="py-0.5 pr-3 text-zinc-800">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            {row.logo && (
                              <img
                                src={row.logo}
                                alt={`${row.team} logo`}
                                className="h-5 w-5 rounded-sm object-contain"
                              />
                            )}
                            <span>{row.team}</span>
                          </div>
                          {row.mascot && (
                            <span className="ml-7 text-xs text-zinc-500">
                              {row.mascot}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-0.5 pr-3 text-xs text-zinc-600">
                        {row.conference}
                      </td>
                      <td className="py-0.5 pl-3 text-right text-zinc-700">
                        {row.score.toFixed(3)}
                      </td>
                      <td className="py-0.5 pl-3 text-right text-zinc-700">
                        {row.wins}-{row.losses}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
