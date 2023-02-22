<script lang="ts">
  //import Plotly from '$lib/components/visualize/Plotly.svelte';
  //import type { Data, Layout } from 'plotly.js';

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  async function fetchTxs() {
    const data = await fetch('https://jardoole.xyz/api/collections/txs/records?sort=-firstBlock&perPage=100')
      .then(res => res.json()
      )
    console.log(data)
    return data;
  }

  const txs = fetchTxs();
</script>
{#await txs}
  <div>loading...</div>
{:then data}
  <div>{data}</div>
{:catch error}
  <div>{error.message}</div>
{/await}
