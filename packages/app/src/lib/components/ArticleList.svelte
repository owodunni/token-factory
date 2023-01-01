<script lang="ts">
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import type { CardData } from '$lib/api';

  export let layout: 'list' | 'grid' = 'list';
  export let showExcerpt = true;
  export let articles: CardData[];
</script>

{#if layout === 'list'}
  <section class="flex flex-col gap-y-4">
    {#each articles as article}
      <ArticleCard {article} {showExcerpt} />
    {/each}
  </section>
{:else if layout === 'grid'}
  <section class="flex flex-row justify-between px-4">
    {#each articles as article}
      <ArticleCard {article} {showExcerpt} />
    {/each}
  </section>
{/if}
