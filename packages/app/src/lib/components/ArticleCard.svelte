<script lang="ts">
  import type { CardData } from '$lib/api';

  export let showExcerpt = true;
  export let article: CardData;
</script>

<a href={article.link} on:click>
  <article class="lg:max-w-2xl prose">
    {#if showExcerpt}
      <h4 class="text-primary my-0">{article.title}</h4>
      <p class="line-clamp-2 my-0">{article.excerpt}</p>
    {:else}
      <p class="my-0">{article.title}</p>
    {/if}
    {#if article.date}
      <i class="text-xs my-0">{article.date}</i>
    {/if}
  </article>
</a>
