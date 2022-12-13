<script lang="ts">
    import type {CardData} from "$lib/api";
 import ArticleList from "$lib/components/ArticleList.svelte";
 import {api} from "$lib/api";

 export let data: CardData
</script>

<div>
    <article class="prose mb-4">
        <h3>{data.title}</h3>
        <p>{data.excerpt}</p>
    </article>
    <ArticleList articles={api.getArticlesByCategory(data.slug)}/>
</div>
