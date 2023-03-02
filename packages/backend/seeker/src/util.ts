export const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

export function toGwei(nmb: string | number) {
  return Number(nmb) / 1000000000.0;
}
