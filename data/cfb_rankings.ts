export type CfbTeamRank = {
  rank: number;
  team: string;
  conference: string;
  score: number;
  wins: number;
  losses: number;
  logo?: string | null;
  mascot?: string | null; // optional mascot name
};


export type CfbRankingsPayload = {
  year: number;
  lastUpdated: string;
  methodSummary: string;
  top25: CfbTeamRank[];
};
