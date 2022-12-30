<script lang="ts">
  import type { ProviderType } from '../../provider';
  import IconMetamask from './IconMetamask.svelte';
  import IconOpera from './IconOpera.svelte';

  export let provider: ProviderType;
  export let classProps: string;
</script>

{#if provider === 'opera'}
  <IconOpera {classProps} />
{:else}
  <IconMetamask {classProps} />
{/if}
