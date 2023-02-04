<script lang="ts">
  import { blockStore, feeStore } from '../../visualization';
  import { derived } from 'svelte/store';
  import type { Block, FeeHistory } from '../../provider';
  import Plotly from '$lib/components/visualize/Plotly.svelte';
  import type { Data, Layout } from 'plotly.js';

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  const feeData = (fee: FeeHistory, blocks: Block[]): Data[] => {
    const prio25: number[] = fee.reward.map((r) => toGwei(r[0])).reverse();
    const prio50: number[] = fee.reward.map((r) => toGwei(r[1])).reverse();
    const prio75: number[] = fee.reward.map((r) => toGwei(r[2])).reverse();
    const base: number[] = fee.baseFeePerGas.map((b) => toGwei(b)).reverse();
    const x: number[] = fee.reward.map((_, i) => Number(blocks[0].number) - i).reverse();

    const baseData: Partial<Data> = { x, type: 'scatter', line: { width: 0.8 } };

    return [
      { ...baseData, y: prio25, name: 'p25' },
      { ...baseData, y: prio50, type: 'scatter', name: 'p50' },
      {
        ...baseData,
        y: prio75,
        name: 'p75'
      },
      { ...baseData, y: base, name: 'base' }
    ];
  };

  const data = derived([feeStore, blockStore], (input) => feeData(...input));
  const layout: Partial<Layout> = {
    title: 'Fee History',
    xaxis: {
      title: 'Block Number',
      type: 'linear',
      autorange: true
    },
    yaxis: {
      title: 'Gwei',
      type: 'linear',
      autorange: true
    },
    legend: {
      yanchor: 'top',
      y: 0.99,
      xanchor: 'left',
      x: 0.01
    },
    margin: {
      r: 0,
      l: 40,
      t: 40
    }
  };
</script>

<Plotly data={$data} {layout} />
