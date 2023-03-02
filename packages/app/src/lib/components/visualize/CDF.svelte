<script lang="ts">
  import type { ProbabilityDocument } from '@token-factory/seeker';
  import Plotly from '$lib/components/visualize/Plotly.svelte';
  import type { Data } from 'plotly.js';

  export let data: ProbabilityDocument;

  const _data: Data[] = [
    {
      y: data.data.cdf.map((x) => 1 - x),
      x: data.data.percentiles,
      type: 'scatter'
    }
  ];

  console.log(_data);

  const layout = {
    title: 'Probability of a transaction being included in a block',
    xaxis: {
      title: 'Priority fee percentile',
      type: 'linear',
      autorange: true,
      tickformat: 'd'
    },
    yaxis: {
      title: 'Probability',
      type: 'linear',
      autorange: true
    }
  };
</script>

<Plotly {layout} data={_data} />
