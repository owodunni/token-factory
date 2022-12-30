<script lang="ts">
  import type { CardData } from '$lib/api';

  export let showExcerpt = true;
  export let article: CardData;
</script>

<a href={article.link} on:click>
  <article class="prose">
    {#if article.date}
      <p class="text-s mb-3">{article.date}</p>
    {/if}
    <h4 class="text-primary my-0">{article.title}</h4>
    {#if showExcerpt}
      <p class="line-clamp-3">{article.excerpt}</p>
    {/if}
  </article>
</a>
