<script lang="ts">
  import type { CardData } from '$lib/api';

  export let showExcerpt = true;
  export let article: CardData;
</script>

<a href={article.link} on:click>
  <article class="prose">
    <h4 class="text-primary my-0">{article.title}</h4>
    {#if showExcerpt}
      <p class="line-clamp-3 my-0">{article.excerpt}</p>
    {/if}
    {#if article.date}
      <p class="text-xs my-0">{article.date}</p>
    {/if}
  </article>
</a>
