<script lang="ts">
  import { Node, type Ethereum, type FeeHistory } from '$lib/provider';
  import Chart from './Chart.svelte';

  export let provider: Ethereum;
  export let block: number;

  let percentiles = [5, 25, 50, 75, 95];

  const toHex = (n: number) => `0x${n.toString(16)}`;

  $: _feeHistory = (async () => {
    return provider ? Node.feeHistory(provider, 15, toHex(block), percentiles) : null;
  })();

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  function options(fee: FeeHistory) {
    return {
      chart: {
        type: 'boxPlot'
      },
      series: [
        {
          data: fee.reward
            .map((r, i) => ({
              x: `${block - i}`,
              y: r.map(toGwei)
            }))
            .reverse()
        }
      ]
    };
  }

  function options2(fee: FeeHistory) {
    return {
      chart: {
        type: 'boxPlot'
      },
      series: [
        {
          data: fee.reward
            .map((r, i) => ({
              x: `${block - i}`,
              y: r.map((v) => toGwei(v) + toGwei(fee.baseFeePerGas[i]))
            }))
            .reverse()
        }
      ]
    };
  }
</script>

{#await _feeHistory}
  <p>...loading</p>
{:then fee}
  <p>Priority fee:</p>
  <Chart options={options(fee)} />
  <p>Total gas:</p>
  <Chart options={options2(fee)} />
{:catch error}
  <p>{error}</p>
  <p>{JSON.stringify(error)}</p>
{/await}
