<script lang="ts">
    import type {CardData} from "$lib/api";
 import ArticleList from "$lib/components/ArticleList.svelte";
 import {api} from "$lib/api";

 export let data: CardData
</script>

<div>
    <article class="prose">
        <h2>{data.title}</h2>
        <p>{data.excerpt}</p>
    </article>
    <ArticleList articles={api.getArticlesByCategory(data.slug)}/>
</div>
