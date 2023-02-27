export { toGwei, feeData } from './transformations';

export const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

export const toHex = (n: number) => `0x${n.toString(16)}`;
