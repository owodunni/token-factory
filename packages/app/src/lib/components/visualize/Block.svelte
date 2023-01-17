<script lang="ts">
  import { currentProvider } from '$lib/provider';
  import { Node } from '$lib/provider';
  import BlockInput from '$lib/components/visualize/BlockInput.svelte';
  import Fee from '$lib/components/visualize/Fee.svelte';
  import { onDestroy } from 'svelte';

  export let block = new Promise((resolve) => {
    const unsubscribe = currentProvider.subscribe(async (provider) => {
      try {
        if (provider) {
          const block = await Node.blockNumber(provider);
          resolve(block);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        resolve('0x0');
      }
    });
    onDestroy(() => {
      unsubscribe();
    });
  });
</script>

{#if $currentProvider}
  {#await block then block}
    <BlockInput
      provider={$currentProvider}
      initialBlock={Number(block)}
      let:provider
      let:block={b}
      let:percentiles
    >
      <Fee {provider} block={b} {percentiles} />
    </BlockInput>
  {/await}
{/if}
