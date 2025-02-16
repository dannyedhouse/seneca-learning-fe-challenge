export const interpolateHSL = (
  percentage: number,
  start: { h: number; s: number; l: number },
  end: { h: number; s: number; l: number }
) => {
  const h = start.h + (end.h - start.h) * percentage;
  const s = start.s + (end.s - start.s) * percentage;
  const l = start.l + (end.l - start.l) * percentage;

  return `hsl(${h}, ${s}%, ${l}%)`;
};
