import { type BlockWithTransactions, currentProvider, type FeeHistory, Node } from '../provider';
import blocks from './blocks.json';
import fee from './fee.json';
import { derived, writable } from 'svelte/store';

const DEFAULT_BLOCK = 16456224;

export const blockNumber = writable(DEFAULT_BLOCK);

const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

const toHex = (n: number) => `0x${n.toString(16)}`;

export const blockStore = derived(
  [blockNumber, currentProvider],
  ([$blockNumber, $provider], set) => {
    if ($provider) {
      Promise.all(
        range($blockNumber - 5, $blockNumber).map(
          (nmb) =>
            Node.getBlockByNumber($provider, toHex(nmb), true) as Promise<BlockWithTransactions>
        )
      )
        .then(set)
        .catch(console.error);
    }
  },
  blocks as unknown as BlockWithTransactions[]
);

export const feeStore = derived(
  [blockNumber, currentProvider],
  ([$blockNumber, $provider], set) => {
    if ($provider) {
      Node.feeHistory($provider, 1000, toHex($blockNumber), [25, 50, 75])
        .then(set)
        .catch(console.error);
    }
  },
  fee as unknown as FeeHistory
);
