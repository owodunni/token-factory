<script lang="ts">
  import Chart from "./Chart.svelte";
  import { blockNumber, type Data, feeStore } from "../../visualization";
  import { derived } from "svelte/store";
  import type { LineChartOptions, ScaleTypes } from "@carbon/charts/interfaces";
  import type { FeeHistory } from "../../provider";


  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  const resize = (data: Data[], maxSize = 100): Data[] => {
    const maxVal = 100;

    const delta = Math.floor( data.length / maxVal );

    const data2: Data[]= [];

    for (let i = 0; i < data.length; i=i+delta) {
      data2.push(data[i]);
    }
    return data2
  }

  const feeData = (fee: FeeHistory, lastBlock: number): Data[] => {
    const prio50: Data[] = fee.reward.map((r, i) => {
      return {
        group: "priority 50",
        date: (fee.reward.length - i).toString(),
        value: toGwei(r[1])
      };
    });

    const prio25: Data[] = fee.reward.map((r, i) => {
      return {
        group: "priority 25",
        date: (fee.reward.length - i).toString(),
        value: toGwei(r[0])
      };
    });

    const prio75: Data[] = fee.reward.map((r, i) => {
      return {
        group: "priority 75",
        date: (fee.reward.length - i).toString(),
        value: toGwei(r[2])
      };
    });

    const base: Data[] = fee.baseFeePerGas.map((b, i) => {
      return {
        group: "base",
        date: (fee.baseFeePerGas.length - i).toString(),
        value: toGwei(b)
      };
    });

    return [...resize(prio25), ...resize(prio50), ...resize(prio75), ...resize(base),];

  };

  const data = derived([feeStore, blockNumber], (input) => feeData(...input));

  let options: LineChartOptions = {
    title: "Gas fee",
    height: "400px",
    curve: "curveNormal",
    resizable: true,
    points: {
      radius: 0
    },
    axes: {
      left: {
        mapsTo: "value",
        scaleType: "linear" as ScaleTypes
      },
      bottom: {
        mapsTo: "date",
        scaleType: "linear" as ScaleTypes
      }
    },
  };
</script>

<Chart />
