<script lang="ts">
  import { onMount } from 'svelte';
  import type Plotly, { Layout, Data } from 'plotly.js';

  let plotContainer;
  export let data: Data[];
  export let layout: Partial<Layout> = {};

  onMount(async () => {
    const plotlyModule = await import('plotly.js-dist-min');
    const plotly = plotlyModule.default as Plotly;

    const createLayout: () => Partial<Layout> = () => ({
      ...layout,
      ...(plotContainer && { width: plotContainer.offsetWidth, height: 400 })
    });

    plotly.newPlot(plotContainer, data, createLayout());

    addEventListener('resize', () => {
      if (plotContainer) {
        plotly.relayout(plotContainer, createLayout());
      }
    });
  });
</script>

<div class="w-full bg-white" bind:this={plotContainer} />
