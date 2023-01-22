<script lang="ts">
  import { type BlockWithTransactions } from '$lib/provider';
  import Chart from './Chart.svelte';
  import type { Data } from '../../visualization';
  import { blockStore } from '../../visualization';
  import { derived } from 'svelte/store';
  import { browser } from '$app/environment';
  import type { BoxplotChartOptions, ScaleTypes } from '@carbon/charts/interfaces';

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  function blockData(_block: BlockWithTransactions): Data[] {
    const blockBaseFee = toGwei(_block.baseFeePerGas);
    const blockGroup = Number(_block.number).toString();

    return _block.transactions.flatMap((tx) => {
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
        return [];
      }
      return [
        {
          group: blockGroup,
          key: tx.hash,
          value: priorityFee
        }
      ];
    });
  }

  const data = derived(blockStore, (blocks) => {
    return browser ? blocks.flatMap((block) => blockData(block)) : [];
  });

  const options: BoxplotChartOptions = {
    title: 'Block priority fee',
    height: '400px',
    resizable: true,
    axes: {
      left: {
        mapsTo: 'value',
        scaleType: 'log' as ScaleTypes
      },
      bottom: {
        mapsTo: 'group',
        scaleType: 'labels' as ScaleTypes
      }
    }
  };
</script>

<Chart data={$data} {options} />
