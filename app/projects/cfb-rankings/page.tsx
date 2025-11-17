import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
        <h1 className="page-heading">College Football Rankings</h1>
        {data ? (
          <>
            <p className="page-subtitle">
              {data.year} FBS-only rankings, generated from game results using a
              win/loss-based scoring system that rewards beating teams with more wins
              and penalizes losing to teams with more losses.
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
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)]">
            {/* Left: explanation cards */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold">How the score works</h2>
                <p className="mt-3 text-sm text-zinc-700">
                  For each game, teams earn points based on the total wins of the teams
                  they beat and lose points based on the total losses of the teams they
                  lose to. The raw score is normalized by games played so teams with
                  more games aren’t automatically favored.
                </p>
                <p className="mt-3 text-sm text-zinc-700">
                  The system only uses win/loss information plus who each team played.
                  It doesn’t use polls, preseason expectations, or brand names, which
                  helps surface strong seasons from less-hyped programs.
                </p>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold">What I built</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                  <li>
                    Data fetch from the collegefootballdata.com API, including FBS-only
                    filtering and conference labeling.
                  </li>
                  <li>
                    Ranking algorithm in Python using pandas, computing scores from
                    opponents&apos; total wins/losses and normalizing by games played.
                  </li>
                  <li>
                    Export pipeline that generates CSV + JSON for this site so rankings
                    can be updated with a single command.
                  </li>
                </ul>
                <p className="mt-3 text-sm text-zinc-700">
                  Next steps I’m considering: incorporating margin-of-victory and
                  drive-level stats, and comparing this ranking against models like FPI
                  and SP+.
                </p>
                <p className="mt-3 text-xs text-zinc-500">
                  Code:{" "}
                  <a
                    href="https://github.com/rskirkwood/college-football-analytics"
                    target="_blank"
                    rel="noreferrer"
                    className="link-accent"
                  >
                    github.com/rskirkwood/college-football-analytics
                  </a>
                </p>
              </div>
            </div>

            {/* Right: rankings table */}
            <div className="card overflow-x-auto">
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
