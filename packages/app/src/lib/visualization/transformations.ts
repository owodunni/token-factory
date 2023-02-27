import type { FeeHistory } from '../provider';

export function toGwei(nmb: string) {
  return Number(nmb) / 1000000000.0;
}

export const feeData = (
  fee: FeeHistory,
  { addBaseGas }: { addBaseGas: boolean } = { addBaseGas: false }
) => {
  const oldestBlock = Number(fee.oldestBlock);
  const base = Array<number>(fee.reward.length);
  const prio10 = Array<number>(fee.reward.length);
  const prio25 = Array<number>(fee.reward.length);
  const prio50 = Array<number>(fee.reward.length);
  const x = Array<number>(fee.reward.length);

  let i = 0;

  const toFee = (nmb: string) => toGwei(nmb) + (addBaseGas ? base[i] : 0);

  for (; i < fee.reward.length; i++) {
    const reward = fee.reward[i];
    base[i] = toGwei(fee.baseFeePerGas[i]);

    prio10[i] = toFee(reward[0]);
    prio25[i] = toFee(reward[1]);
    prio50[i] = toFee(reward[2]);
    x[i] = oldestBlock + i;
  }

  const baseData = {
    x,
    type: 'scatter',
    line: { width: 0.8 },
    hovertemplate: 'Block: %{x:f}<br>Fee: %{y:.2f} Gwei'
  };

  return [
    {
      ...baseData,
      y: prio50,
      name: 'p50'
    },
    { ...baseData, y: prio25, type: 'scatter', name: 'p25' },
    { ...baseData, y: prio10, name: 'p10' },
    { ...baseData, y: base, name: 'base' }
  ] as const;
};
