// components/CfbTop25Card.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CfbRankingsPayload, CfbTeamRank } from "@/data/cfb_rankings";

type Props = {
  asLink?: boolean;
};

export default function CfbTop25Card({ asLink = false }: Props) {
  const [data, setData] = useState<CfbRankingsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/cfb_rankings.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: CfbRankingsPayload) => setData(json))
      .catch((err) => {
        console.error("Failed to load cfb_rankings.json", err);
        setError("Could not load rankings.");
      });
  }, []);

  // Shared inner content builder
  const renderInner = (payload: CfbRankingsPayload | null, err: string | null) => {
    if (err) {
      return (
        <>
          <h2 className="text-xl font-semibold">College Football Rankings</h2>
          <p className="mt-2 text-sm text-zinc-700">
            {err} (This might be due to missing or out-of-date ranking data.)
          </p>
        </>
      );
    }

    if (!payload) {
      return (
        <>
          <h2 className="text-xl font-semibold">College Football Rankings</h2>
          <p className="mt-2 text-sm text-zinc-700">Loading latest Top 25…</p>
        </>
      );
    }

    const top10: CfbTeamRank[] = payload.top25.slice(0, 15);

    return (
      <>
        <h2 className="text-xl font-semibold">College Football Rankings</h2>
        <p className="mt-1 text-xs text-zinc-500">
          {payload.year} season · Updated {payload.lastUpdated}
        </p>

        <p className="mt-3 text-sm text-zinc-700">{payload.methodSummary}</p>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-sm">
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
              {top10.map((row) => (
                <tr key={row.rank} className="align-middle">
                  <td className="py-0.5 pr-3 text-zinc-700">{row.rank}</td>
                  <td className="py-0.5 pr-3 text-zinc-800">
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

        {/* <div className="mt-4 flex items-center justify-between text-sm">
          {asLink ? (
            <>
              <span className="text-xs text-zinc-500">
                View full Top 25 and methodology →
              </span>
              <span className="text-[11px] text-zinc-400">
                Code on GitHub (see project page)
              </span>
            </>
          ) : (
            <>
              <Link href="/projects/cfb-rankings" className="link-accent">
                View full Top 25 →
              </Link>
              <a
                href="https://github.com/rskirkwood/college-football-analytics"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-zinc-500 hover:text-zinc-700 underline underline-offset-4"
              >
                View code on GitHub
              </a>
            </>
          )}
        </div> */}
      </>
    );
  };

  const inner = renderInner(data, error);

  if (asLink) {
    // Whole card is clickable; no nested links inside
    return (
      <Link
        href="/projects/cfb-rankings"
        className="card block focus:outline-none"
      >
        {inner}
      </Link>
    );
  }

  return <article className="card">{inner}</article>;
}
