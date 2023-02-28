<script lang="ts">
  import Plotly from '$lib/components/visualize/Plotly.svelte';
  import type { Data, Layout } from 'plotly.js';
  import type { TxListResult } from '@token-factory/seeker';
  import type { FeeHistory } from '../../provider';

  import { feeData, range } from '../../visualization';

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  export let data: TxListResult | null = null;

  export let minSize = 3;
  export let maxSize = 20;

  const { items } = data;

  /** Hardcoded used for now, to refresh the data, change the number
   * use {@link feeHistory} to get the latest data
   */
  const fees: FeeHistory = {
    baseFeePerGas: [
      '0x5e1900480',
      '0x5eed48dcb',
      '0x5b7b99e89',
      '0x61bf646c6',
      '0x622421702',
      '0x63df908a8',
      '0x5f2a94a47',
      '0x5d225ad95',
      '0x5ef35adb4',
      '0x5c5b609f4',
      '0x5ffa4f243',
      '0x5d17bfa35',
      '0x5b53c96d3',
      '0x5b3b763fa',
      '0x597e3a436',
      '0x5988df0d8',
      '0x56a5b3487',
      '0x61768633c',
      '0x629f4a7c6',
      '0x63c2d6b3d',
      '0x583471f53',
      '0x633217157'
    ],
    gasUsedRatio: [
      0.5352498666666666, 0.3548746, 0.7739228666666667, 0.5161030666666667, 0.5705989, 0.3114824,
      0.4145861, 0.5780124333333333, 0.39073636666666667, 0.6568188333333334, 0.37976373333333335,
      0.4241412333333333, 0.4958383, 0.42374643333333334, 0.5018583333333333, 0.37100473333333334,
      0.9992987666666666, 0.5475768333333333, 0.5461907333333333, 0.036644, 0.9984215333333334
    ],
    oldestBlock: '0xfe8c2e',
    reward: [
      ['0x8ae7b0c', '0xe5b1a80', '0x1dcd6500'],
      ['0x93c5754', '0x1dcd6500', '0x1dcd6500'],
      ['0x825d7bc', '0x1dcd6500', '0x1dcd6500'],
      ['0x6b9990a', '0x1dcd6500', '0x1dcd6500'],
      ['0x1dcd6500', '0x1dcd6500', '0x1dcd6500'],
      ['0x8aafb4b', '0x1dcd6500', '0x2bb662c1'],
      ['0x6b9990a', '0x1dcd6500', '0x1dcd6500'],
      ['0x82921be', '0x1dc5716b', '0x1dc5716b'],
      ['0x7a8b131', '0x1dcd6500', '0x1e82d64c'],
      ['0x6b9990a', '0x1dcd6500', '0x2a35150c'],
      ['0x1dcd6500', '0x1dcd6500', '0x1dcd6500'],
      ['0x1dcd6500', '0x1dcd6500', '0x1e6f24cb'],
      ['0x6b9990a', '0x8aafb4b', '0x1dcd6500'],
      ['0x83ecbe3', '0x1dcd6500', '0x3b9aca00'],
      ['0xa8b0dca', '0xa8b0dca', '0xced67ca'],
      ['0x1dcd6500', '0x1dcd6500', '0x1dcd6500'],
      ['0x1dcd6500', '0x1f4dd6db', '0x2c27bb79'],
      ['0x6b9990a', '0x1dcd6500', '0x1dcd6500'],
      ['0x11a0b6e4', '0x1dcd6500', '0x29dcadc3'],
      ['0x1dcd6500', '0x1dcd6500', '0x1dcd6500'],
      ['0xa8b0dca', '0x1dcd6500', '0x219ffd32']
    ]
  };

  const _data = (() => {
    const min = Number(fees.oldestBlock);

    const partialData = feeData(fees, { addBaseGas: true });

    items.forEach(async (item) => {
      if (!item.block) return;

      const [firstBlock, lastBlock] = [Number(item.firstBlock), Number(item.block)];

      const x = range(firstBlock, lastBlock + 1);
      if (x.length < minSize || x.length > maxSize) return;

      const y = Array<number>(x.length);

      const j = firstBlock - min;

      for (let i = 0; i < x.length; i++) {
        const base = partialData[3].y[i + j];
        if (item.maxFeePerGas && item.maxPriorityFeePerGas) {
          y[i] = Math.min(
            toGwei(item.maxFeePerGas.toString()),
            toGwei(item.maxPriorityFeePerGas.toString()) + base
          );
        } else if (item.gasPrice) {
          y[i] = toGwei(item.gasPrice);
        } else {
          return;
        }
      }

      (partialData as Data[]).push({
        x,
        y,
        type: 'scatter',
        name: `tx ${item.hash.slice(0, 6)}`,
        hovertemplate: `Block: %{x:f}<br>Fee: %{y:.2f} Gwei <br> MaxFeePerGas ${toGwei(
          item.maxFeePerGas.toString()
        )} <br> MaxPriorityFeePerGas ${toGwei(
          item.maxPriorityFeePerGas.toString()
        )} <br> Gas ${item.gas.toString()}`
      });
    });
    return partialData;
  })();

  const layout: Partial<Layout> = {
    title: 'Fee History',
    xaxis: {
      title: 'Block Number',
      type: 'linear',
      autorange: true,
      tickformat: 'd'
    },
    yaxis: {
      title: 'Gwei',
      type: 'linear',
      autorange: true
    },
    legend: {
      yanchor: 'bottom',
      y: 0.01,
      xanchor: 'right',
      x: 0.99
    },
    margin: {
      r: 0,
      l: 40,
      t: 40
    }
  };
</script>

<Plotly data={_data} {layout} />
