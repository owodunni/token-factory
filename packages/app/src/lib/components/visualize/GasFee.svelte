<script lang="ts">
  import Chart from './Chart.svelte';
  import { blockStore, feeStore } from '../../visualization';
  import { derived } from 'svelte/store';
  import type { Block, FeeHistory } from '../../provider';
  import type uPlot from 'uplot';
  import { browser } from '$app/environment';

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  const feeData = (fee: FeeHistory, blocks: Block[]): uPlot.AlignedData => {
    const prio25: number[] = fee.reward.map((r) => toGwei(r[0])).reverse();
    const prio50: number[] = fee.reward.map((r) => toGwei(r[1])).reverse();
    const prio75: number[] = fee.reward.map((r) => toGwei(r[2])).reverse();
    const base: number[] = fee.baseFeePerGas.map((b) => toGwei(b)).reverse();
    const x: number[] = fee.reward.map((_, i) => Number(blocks[0].number) - i).reverse();

    return [x, prio25, prio50, prio75, base];
  };

  const data = derived([feeStore, blockStore], (input) => feeData(...input));

  let options: uPlot.Options = {
    title: 'Gas fee',
    height: 400,
    width: 400,
    series: [
      {
        label: 'block'
      },
      {
        label: 'p25',
        scale: '%',
        value: (u, v) => (v == null ? '-' : v.toFixed(2) + ' Gwei'),
        stroke: 'red',
        width: 2 / (browser ? devicePixelRatio : 1)
      },
      {
        label: 'p50',
        scale: '%',
        value: (u, v) => (v == null ? '-' : v.toFixed(2) + ' Gwei'),
        stroke: 'blue',
        width: 2 / (browser ? devicePixelRatio : 1)
      },
      {
        label: 'p75',
        scale: '%',
        value: (u, v) => (v == null ? '-' : v.toFixed(2) + ' Gwei'),
        stroke: 'brown',
        width: 2 / (browser ? devicePixelRatio : 1)
      },
      {
        label: 'base',
        scale: '%',
        value: (u, v) => (v == null ? '-' : v.toFixed(2) + ' Gwei'),
        stroke: 'orange',
        width: 2 / (browser ? devicePixelRatio : 1)
      }
    ],
    scales: {
      x: {
        time: false
      }
    },
    axes: [
      {},
      {
        scale: '%',
        values: (u, vals) => vals.map((v) => +v.toFixed(2) + ' Gw')
      }
    ]
  };
</script>

<Chart data={$data} {options} />
