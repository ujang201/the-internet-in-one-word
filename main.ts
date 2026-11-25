// The Internet in One Word — entry program.
//
// Picks, deterministically, the single word that best describes the whole
// internet, then writes it to entry.txt. No randomness, no clock, no
// network, no input: the same run always produces the same byte.
//
// How the word is chosen: a fixed table of candidate words, each scored
// against the judge's own five criteria (single word, funny, true of the
// whole internet, surprising, lands in one beat). The highest total wins.
// The winner is "yapping": the entire internet is millions of people
// talking at once about everything and nothing — funny on its own, true
// of the whole internet rather than one app, and not the first word
// anyone reaches for.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The judge's criteria, most important first, as fixed weights.
const CRITERIA = [
  { name: "single-word", weight: 5 },
  { name: "funny", weight: 4 },
  { name: "true-of-the-whole-internet", weight: 3 },
  { name: "surprising", weight: 2 },
  { name: "lands-in-one-beat", weight: 1 },
] as const;

// Candidates with a fixed 0..5 score per criterion, in CRITERIA order.
// Scores are the author's own judgement, frozen at write time.
const CANDIDATES: Array<{ word: string; scores: number[] }> = [
  { word: "yapping", scores: [5, 5, 5, 4, 5] },
  { word: "unhinged", scores: [5, 4, 4, 4, 4] },
  { word: "doomscroll", scores: [5, 4, 4, 2, 4] },
  { word: "feral", scores: [5, 4, 3, 4, 5] },
  { word: "chaos", scores: [5, 2, 3, 1, 5] },
  { word: "void", scores: [5, 2, 2, 3, 5] },
  { word: "procrastination", scores: [5, 3, 3, 2, 2] },
  { word: "rabbit-hole", scores: [4, 3, 3, 3, 3] },
];

function totalScore(candidate: (typeof CANDIDATES)[number]): number {
  let total = 0;
  for (let i = 0; i < CRITERIA.length; i++) {
    total += CRITERIA[i].weight * candidate.scores[i];
  }
  return total;
}

function pickWord(): string {
  let best = CANDIDATES[0];
  let bestScore = totalScore(best);
  // Strictly-greater keeps the earliest candidate on a tie: deterministic.
  for (let i = 1; i < CANDIDATES.length; i++) {
    const score = totalScore(CANDIDATES[i]);
    if (score > bestScore) {
      best = CANDIDATES[i];
      bestScore = score;
    }
  }
  return best.word;
}

// The gate, checked here before writing so a bad word can never ship:
// UTF-8 text of 1 to 30 characters, not only white space, a single word.
function checkGate(word: string): void {
  const chars = [...word];
  if (chars.length < 1 || chars.length > 30) {
    throw new Error(`gate: word must be 1-30 characters, got ${chars.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("gate: word must not be only white space");
  }
  if (/\s/.test(word)) {
    throw new Error("gate: entry must be a single word, no white space");
  }
}

function main(): void {
  const word = pickWord();
  checkGate(word);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), word, "utf8");
}

main();
