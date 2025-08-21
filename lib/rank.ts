import { Movie } from '../data/movies';

export type Prefs = {
  maxMinutes: number;
  genres: string[];
  platforms: string[];
  moods: string[];
};

export function rankMatches(matches: Movie[], prefs: Prefs) {
  return matches
    .filter(m => m.minutes <= prefs.maxMinutes)
    .map(m => {
      let score = 1;
      const g = m.genres.filter(x => prefs.genres.includes(x)).length;
      if (g) score += 0.5 * g;
      if (m.platforms.some(p => prefs.platforms.includes(p))) score += 0.5;
      if (m.tags?.some(t => prefs.moods.includes(t))) score += 0.5;
      return { ...m, score };
    })
    .sort((a, b) => b.score - a.score);
}

export function weightedPick<T extends { score: number }>(arr: T[]) {
  const total = arr.reduce((s, x) => s + x.score, 0);
  let r = Math.random() * total;
  return arr.find(x => (r -= x.score) < 0) ?? arr[0];
}
