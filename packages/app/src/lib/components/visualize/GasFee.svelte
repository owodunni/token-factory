<script lang="ts">
  import { blockStore, feeData, feeStore } from '../../visualization';
  import { derived } from 'svelte/store';
  import Plotly from '$lib/components/visualize/Plotly.svelte';
  import type { Layout } from 'plotly.js';

  const data = derived([feeStore, blockStore], ([fees, blocks]) => feeData(fees, blocks[0]));
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
