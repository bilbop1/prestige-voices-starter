// Per-instance limits; serverless instances do not share state.
export function createLimiter(limit = 3, windowMs = 60000, now = Date.now) {
  let hits = [];
  return () => {
    const time = now();
    hits = hits.filter(t => time - t < windowMs);
    if (hits.length >= limit) return false;
    hits.push(time);
    return true;
  };
}
export const allowGeneration = createLimiter();
