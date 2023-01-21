<script lang="ts">
  import '@carbon/styles/css/styles.css';
  import '@carbon/charts/styles.css';
  import { onMount } from 'svelte';
  import type { Data } from '../../visualization';
  import type { BoxplotChartOptions, ScaleTypes } from '@carbon/charts/interfaces';

  export let data: Data[];

  let chart;

  const options: BoxplotChartOptions = {
    title: 'Vertical box plot',
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

  onMount(async () => {
    const charts = await import('@carbon/charts-svelte');
    chart = charts.BoxplotChart;
  });
</script>

<svelte:component this={chart} {data} {options} />
