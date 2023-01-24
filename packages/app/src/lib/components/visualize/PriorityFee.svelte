<script lang="ts">
  import { blockStore } from '../../visualization';
  import { derived } from 'svelte/store';
  import { browser } from '$app/environment';
  import Chart from '$lib/components/visualize/Chart.svelte';
  import uPlot from 'uplot';

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  const data = derived(blockStore, (blocks) => {
    const x: number[] = [];
    const fee: number[] = [];
    blocks.forEach((_block) => {
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
          x.push(Number(_block.number));
          fee.push(priorityFee);
        }
      });
    });
    return [x, fee];
  });

  let options: uPlot.Options = {
    title: 'Priority fee',
    height: 400,
    width: 400,
    series: [
      {
        label: 'block'
      },
      {
        label: 'priority fee',
        scale: '%',
        value: (u, v) => (v == null ? '-' : v.toFixed(2) + ' Gwei'),
        stroke: 'red',
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
