<script lang="ts">
  import type { ProviderType } from '../../provider';
  import IconMetamask from './IconMetamask.svelte';
  import IconOpera from './IconOpera.svelte';
  import IconWallet from '$lib/components/icons/IconWallet.svelte';

  export let provider: ProviderType;
  export let classProps: string;
</script>

{#if provider === 'opera'}
  <IconOpera {classProps} />
{:else if provider === 'metamask'}
  <IconMetamask {classProps} />
{:else}
  <IconWallet {classProps} />
{/if}
