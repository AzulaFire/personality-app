import { PULSE } from './personalityData';

export function matchProfiles(code) {
  const allCodes = [];

  for (const a in PULSE.purpose)
    for (const b in PULSE.unity)
      for (const c in PULSE.logic)
        for (const d in PULSE.stress)
          for (const e in PULSE.engagement) allCodes.push(a + b + c + d + e);

  const getScore = (target) => {
    let score = 0;
    for (let i = 0; i < 5; i++) {
      if (target[i] === code[i]) score += 2;
      else score += 1;
    }
    return score;
  };

  return allCodes
    .filter((c) => c !== code)
    .map((c) => ({ code: c, score: getScore(c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
