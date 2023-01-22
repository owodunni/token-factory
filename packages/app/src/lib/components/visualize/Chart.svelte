<script lang="ts">
  import { onMount } from 'svelte';
  import type { Data } from '../../visualization';
  import type { BoxplotChartOptions } from '@carbon/charts/interfaces';
  import { ChartTheme } from '@carbon/charts/interfaces';

  export let data: Data[];

  let chart;

  export let options: BoxplotChartOptions;

  const themeSwitcher = () => {
    const isDarkMode = () =>
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDarkMode() ? ChartTheme.G100 : ChartTheme.WHITE;
    if (options.theme === theme) return;
    options = { ...options, theme };
  };

  onMount(async () => {
    const charts = await import('@carbon/charts-svelte');
    chart = charts.BoxplotChart;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeSwitcher);
    themeSwitcher();
  });
</script>

<svelte:component this={chart} {data} {options} />
