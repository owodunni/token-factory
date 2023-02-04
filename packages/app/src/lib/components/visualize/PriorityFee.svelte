<script lang="ts">
  import { blockStore } from '../../visualization';
  import { derived } from 'svelte/store';
  import Plotly from '$lib/components/visualize/Plotly.svelte';
  import type { Layout, Data } from 'plotly.js';

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  const data = derived(blockStore, (blocks): Data[] => {
    return blocks.map((_block) => {
      const fee: number[] = [];
      const blockBaseFee = toGwei(_block.baseFeePerGas);

      _block.transactions.forEach((tx) => {
        let priorityFee: number;
        if (tx.maxFeePerGas && tx.maxPriorityFeePerGas) {
          priorityFee = Math.min(
            toGwei(tx.maxPriorityFeePerGas),
            toGwei(tx.maxFeePerGas) - blockBaseFee
          );
        } else {
          priorityFee = toGwei(tx.gasPrice) - blockBaseFee;
        }
        if (priorityFee < 0.01) {
          return;
        } else {
          fee.push(priorityFee);
        }
      });
      return {
        y: fee,
        type: 'box',
        boxpoints: 'suspectedoutliers',
        name: `Block ${Number(_block.number)}`
      };
    });
  });

  const layout: Partial<Layout> = {
    title: 'Priority Fee',
    xaxis: {
      title: 'Block Number'
    },
    yaxis: {
      title: 'Priority Fee (Gwei)',
      type: 'log',
      autorange: true
    },
    showlegend: false,
    margin: {
      r: 0,
      l: 40,
      t: 40
    }
  };
</script>

<Plotly data={$data} {layout} />
