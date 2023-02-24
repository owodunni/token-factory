import type { Block, FeeHistory } from '../provider';
import type { Data } from 'plotly.js';

export function toGwei(nmb: string) {
  return Number(nmb) / 1000000000.0;
}

export const feeData = (
  fee: FeeHistory,
  block: Block,
  { addBaseGas }: { addBaseGas: boolean } = { addBaseGas: false }
): Data[] => {
  const oldestBlock = Number(fee.oldestBlock);
  const base: number[] = [];
  const prio25: number[] = [];
  const prio50: number[] = [];
  const prio75: number[] = [];
  const x = [];

  let i = 0;

  const toFee = (nmb: string) => toGwei(nmb) + (addBaseGas ? base[i] : 0);

  for (; i < fee.reward.length; i++) {
    const reward = fee.reward[i];
    base.push(toGwei(fee.baseFeePerGas[i]));

    prio25.push(toFee(reward[0]));
    prio50.push(toFee(reward[1]));
    prio75.push(toFee(reward[2]));
    x.push(oldestBlock + i);
  }

  const baseData: Partial<Data> = {
    x,
    type: 'scatter',
    line: { width: 0.8 },
    hovertemplate: 'Block: %{x:f}<br>Fee: %{y:.2f} Gwei'
  };

  return [
    {
      ...baseData,
      y: prio75,
      name: 'p75'
    },
    { ...baseData, y: prio50, type: 'scatter', name: 'p50' },
    { ...baseData, y: prio25, name: 'p25' },
    { ...baseData, y: base, name: 'base' }
  ];
};
