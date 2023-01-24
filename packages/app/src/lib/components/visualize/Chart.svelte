<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type uPlot from 'uplot';

  let plotContainer;
  let plot: uPlot;
  export let options: uPlot.Options = {
    width: 400,
    height: 400,
    scales: { x: { time: false } },
    series: [{ label: 'x' }, { label: 'y', stroke: 'red' }]
  };
  export let data: uPlot.AlignedData = [
    [1, 2, 3, 4, 5],
    [1, 3, 2, 5, 4]
  ];

  function touchZoomPlugin() {
    function init(u) {
      let over = u.over;
      let rect, oxRange, oyRange, xVal, yVal;
      let fr = { x: 0, y: 0, dx: 0, dy: 0 };
      let to = { x: 0, y: 0, dx: 0, dy: 0 };

      function storePos(t, e) {
        let ts = e.touches;

        let t0 = ts[0];
        let t0x = t0.clientX - rect.left;
        let t0y = t0.clientY - rect.top;

        if (ts.length == 1) {
          t.x = t0x;
          t.y = t0y;
          t.d = t.dx = t.dy = 1;
        } else {
          let t1 = e.touches[1];
          let t1x = t1.clientX - rect.left;
          let t1y = t1.clientY - rect.top;

          let xMin = Math.min(t0x, t1x);
          let yMin = Math.min(t0y, t1y);
          let xMax = Math.max(t0x, t1x);
          let yMax = Math.max(t0y, t1y);

          // midpts
          t.y = (yMin + yMax) / 2;
          t.x = (xMin + xMax) / 2;

          t.dx = xMax - xMin;
          t.dy = yMax - yMin;

          // dist
          t.d = Math.sqrt(t.dx * t.dx + t.dy * t.dy);
        }
      }

      let rafPending = false;

      function zoom() {
        rafPending = false;

        let left = to.x;
        let top = to.y;

        // non-uniform scaling
        //	let xFactor = fr.dx / to.dx;
        //	let yFactor = fr.dy / to.dy;

        // uniform x/y scaling
        let xFactor = fr.d / to.d;
        let yFactor = fr.d / to.d;

        let leftPct = left / rect.width;
        let btmPct = 1 - top / rect.height;

        let nxRange = oxRange * xFactor;
        let nxMin = xVal - leftPct * nxRange;
        let nxMax = nxMin + nxRange;

        let nyRange = oyRange * yFactor;
        let nyMin = yVal - btmPct * nyRange;
        let nyMax = nyMin + nyRange;

        u.batch(() => {
          u.setScale('x', {
            min: nxMin,
            max: nxMax
          });

          u.setScale('y', {
            min: nyMin,
            max: nyMax
          });
        });
      }

      function touchmove(e) {
        storePos(to, e);

        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(zoom);
        }
      }

      over.addEventListener('touchstart', function (e) {
        rect = over.getBoundingClientRect();

        storePos(fr, e);

        oxRange = u.scales.x.max - u.scales.x.min;
        oyRange = u.scales.y.max - u.scales.y.min;

        let left = fr.x;
        let top = fr.y;

        xVal = u.posToVal(left, 'x');
        yVal = u.posToVal(top, 'y');

        document.addEventListener('touchmove', touchmove, { passive: true });
      });

      over.addEventListener('touchend', function () {
        document.removeEventListener('touchmove', touchmove, { passive: true });
      });
    }

    return {
      hooks: {
        init
      }
    };
  }

  function redraw(uplot) {
    let opt = { ...options, plugins: [touchZoomPlugin()] };
    opt.width = plotContainer != null ? plotContainer.offsetWidth : opt.width;
    opt.height = (400 * 2) / 3;
    return new uplot(opt, data, plotContainer) as uPlot;
  }

  onMount(async () => {
    const uPlotModule = await import('uplot');
    const uPlot = uPlotModule.default;
    let plot = redraw(uPlot);
    addEventListener('resize', () => {
      if (plotContainer) {
        plot.destroy();
        plot = redraw(uPlot);
      }
    });
  });

  onDestroy(() => {
    plot?.destroy();
  });
</script>

<div class="w-full bg-white" bind:this={plotContainer} />
