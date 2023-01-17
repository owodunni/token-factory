<script lang="ts">
  import { Node, type Ethereum } from '$lib/provider';

  export let provider: Ethereum;
  export let block: number;

  export let percentiles: string;
  $: getPercentiles = percentiles.split(',').map(Number);

  const toHex = (n: number) => `0x${n.toString(16)}`;

  $: _feeHistory = (async () => {
    return provider ? Node.feeHistory(provider, 2, toHex(block), getPercentiles) : null;
  })();
</script>

<div />
{#await _feeHistory}
  <p>...loading</p>
{:then fee}
  <p>History</p>
  <p>{JSON.stringify(fee, null, 2)}</p>
{:catch error}
  <p>{error}</p>
  <p>{JSON.stringify(error)}</p>
{/await}
