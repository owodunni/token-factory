<script lang="ts">
  import type { CardData } from '$lib/api';
  import ArticleList from '$lib/components/ArticleList.svelte';
  import { api } from '$lib/api';
  import Divider from '$lib/components/Divider.svelte';

  export let data: CardData;
</script>

<div>
  <article class="prose mb-4">
    <h3>{data.title}</h3>
    <p>{data.excerpt}</p>
  </article>
  <Divider />
  <ArticleList articles={api.getArticlesByCategory(data.slug)} />
</div>
