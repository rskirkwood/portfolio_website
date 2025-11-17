#!/usr/bin/env python3
"""
export_cfb_json.py

Uses your external college football rankings repo to:
  1) Run rank_cfb25.py (which fetches data + computes rankings)
  2) Read the resulting CSV
  3) Convert the Top 25 into public/data/cfb_rankings.json (with logo paths)

Run from the *portfolio* repo root:

  export CFB_API_KEY="your_real_key_here"        # required by rank_cfb25.py
  export CFB_REPO_PATH="/full/path/to/your/cfb/repo"  # optional if default is wrong
  export CFB_CSV_NAME="results_2025_fbs_with_conf.csv"  # optional if your CSV name differs

  python scripts/export_cfb_json.py

Requirements:
  - pandas installed in the Python environment you use
"""

import json
import os
import subprocess
import sys
from datetime import date
from pathlib import Path

import pandas as pd

# Portfolio repo root (this script is at ROOT/scripts/export_cfb_json.py)
ROOT = Path(__file__).resolve().parents[1]

# Where your CFB rankings repo lives (external)
# Default: sibling folder called "college-football-analytics"
CFB_REPO = Path(
    os.environ.get("CFB_REPO_PATH", ROOT.parent / "cfb_rankings")
)

# Year + CSV name
DEFAULT_YEAR = 2025  # adjust if needed
DEFAULT_CSV_NAME = os.environ.get(
    "CFB_CSV_NAME", f"results_{DEFAULT_YEAR}_fbs_with_conf.csv"
)

LOGO_DIR = ROOT / "public" / "logos" / "cfb"

# Manual logo overrides for ambiguous team names.
# Key: team name as it appears in your CSV ("Georgia", "Miami", etc.)
# Value: filename in LOGO_DIR (no path), e.g. "Georgia_Bulldogs_logo-300x300.png"
LOGO_OVERRIDES: dict[str, str] = {
    # Example entries you can adjust based on your actual filenames:
    # "Georgia": "Georgia_Bulldogs_logo-300x300.png",
    "Illinois": "Illinois_Fighting_Illini_logo-300x300.png",
    # "Miami": "Miami_Hurricanes_logo-300x300.png",
}


def normalize_name(s: str) -> str:
    """Lowercase, remove non-alphanumeric characters for fuzzy comparison."""
    return "".join(ch.lower() for ch in s if ch.isalnum())


def build_logo_index():
  """
  Scan LOGO_DIR and build a map of normalized filename -> relative public path.
  Example:
    'tcuhornedfrogslogo300x300' -> '/logos/cfb/TCU_Horned_Frogs_logo-300x300.png'
  """
  index: dict[str, str] = {}
  if not LOGO_DIR.exists():
    print(f"[warn] Logo dir {LOGO_DIR} does not exist; logo field will be null")
    return index

  for file in LOGO_DIR.iterdir():
    if not file.is_file():
      continue
    if file.suffix.lower() not in {".png", ".jpg", ".jpeg", ".svg", ".webp"}:
      continue
    key = normalize_name(file.stem)
    rel_path = f"/logos/cfb/{file.name}"
    index[key] = rel_path
  return index


def find_logo_for_team(team_name: str, mascot: str | None, logo_index: dict[str, str]) -> str | None:
    """
    Try to find a logo in logo_index for the given team name + mascot.

    Strategy:
      1) Manual override if defined (LOGO_OVERRIDES).
      2) Build several candidate keys:
         - normalized(team_name)
         - normalized(mascot)
         - normalized(team_name + mascot)
      3) For each candidate:
         - First look for exact key match in logo_index.
         - Then pick the shortest filename whose normalized stem contains the candidate.
    """
    # 1) Manual override by team name
    override = LOGO_OVERRIDES.get(team_name)
    if override:
        return f"/logos/cfb/{override}"

    if not logo_index:
        return None

    # Build candidate keys
    candidates: list[str] = []

    team_key = normalize_name(team_name)
    if team_key:
        candidates.append(team_key)

    if mascot:
        mascot_key = normalize_name(mascot)
        if mascot_key:
            candidates.append(mascot_key)
            # Combined team + mascot, e.g. "georgiabulldogs"
            candidates.append(team_key + mascot_key)

    # Deduplicate while preserving order
    unique_candidates: list[str] = []
    seen = set()
    for c in candidates:
        if c not in seen:
            seen.add(c)
            unique_candidates.append(c)

    # 2) Try each candidate in order
    for cand in unique_candidates:
        # Exact match
        if cand in logo_index:
            return logo_index[cand]

        # Fuzzy: choose the shortest filename that contains this candidate
        best_path: str | None = None
        best_len = 10**9
        for key, path in logo_index.items():
            if cand in key:
                if len(key) < best_len:
                    best_len = len(key)
                    best_path = path
        if best_path:
            return best_path

    return None


def main():
  if not CFB_REPO.exists():
    print(
      f"[error] CFB_REPO_PATH {CFB_REPO} does not exist. "
      "Set CFB_REPO_PATH to your rankings repo path.",
      file=sys.stderr,
    )
    sys.exit(1)

  print(f"Using CFB repo at: {CFB_REPO}")

  # 1) Run your existing ranking script to regenerate CSV in the CFB repo
  print("Running rank_cfb25.py to refresh rankings CSV...")
  result = subprocess.run(
    [sys.executable, "rank_cfb25.py"],
    cwd=CFB_REPO,
    check=False,
  )
  if result.returncode != 0:
    print("[error] rank_cfb25.py failed; aborting export.", file=sys.stderr)
    sys.exit(result.returncode)

  # 2) Load CSV produced by rank_cfb25.py
  csv_path = CFB_REPO / DEFAULT_CSV_NAME
  if not csv_path.exists():
    raise FileNotFoundError(
      f"Expected CSV not found: {csv_path}\n"
      "If your script writes a different file, set CFB_CSV_NAME env var."
    )

  print(f"Loading rankings from {csv_path} ...")
  df = pd.read_csv(csv_path)

  # Adjust these column names if your CSV uses different labels:
  # "team", "conference", "normalized_score", "wins", "losses"
  if "normalized_score" not in df.columns:
    raise KeyError(
      "CSV is missing 'normalized_score' column; adjust export script or CSV name."
    )

  df = df.sort_values(by="normalized_score", ascending=False).reset_index(drop=True)
  df["rank"] = df.index + 1

  top25 = df.head(25).copy()

  logo_index = build_logo_index()

  records: list[dict] = []
  for _, row in top25.iterrows():
    team = str(row["team"])
    conference = str(row.get("conference") or "Independent/Unknown")
    score = float(row["normalized_score"])
    wins = int(row.get("wins", 0))
    losses = int(row.get("losses", 0))
    mascot = row.get("mascot")
    mascot = str(mascot) if isinstance(mascot, str) else None

    logo = find_logo_for_team(team, mascot, logo_index)

    records.append(
        {
            "rank": int(row["rank"]),
            "team": team,
            "conference": conference,
            "score": round(score, 3),
            "wins": wins,
            "losses": losses,
            "mascot": mascot,
            "logo": logo,
        }
    )

  out_dir = ROOT / "public" / "data"
  out_dir.mkdir(parents=True, exist_ok=True)
  out_path = out_dir / "cfb_rankings.json"

  payload = {
    "year": DEFAULT_YEAR,
    "lastUpdated": date.today().isoformat(),
    "methodSummary": (
      "Teams earn points based on the total wins of the teams they have beaten, "
      "and lose points based on the total losses of the teams they’ve lost to. "
      "Scores are normalized by games played and filtered to FBS teams only."
    ),
    "top25": records,
  }

  with out_path.open("w", encoding="utf-8") as f:
    json.dump(payload, f, indent=2)

  print(f"Wrote JSON rankings to {out_path}")


if __name__ == "__main__":
  main()
