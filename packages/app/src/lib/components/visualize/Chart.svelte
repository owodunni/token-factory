<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type uPlot from "uplot"

  let plotContainer;
  let plot: uPlot;
  let options: uPlot.Options = {
      width: 600,
      height: 300,
      scales: {x: {time: false}},
      series: [{label: "x"}, {label: "y", stroke: "red"}],
    };
  let data: uPlot.AlignedData = [[1, 2, 3, 4, 5], [1, 3, 2, 5, 4]];

  function redraw(uplot) {
    plot = new uplot(options, data, plotContainer) as uPlot;
  }

  onMount(async () => {
    const uPlotModule = await import('uplot');
    const uPlot = uPlotModule.default;
    redraw(uPlot);
  })

  onDestroy(() => {
    plot?.destroy();
  });
</script>

<div bind:this={plotContainer}></div>
