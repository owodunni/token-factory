<script lang="ts">
    import type {CardData} from "$lib/api";
 import ArticleList from "$lib/components/ArticleList.svelte";
 import {api} from "$lib/api";
 import Divider from "$lib/components/Divider.svelte";

 export let data: CardData
</script>

<div>
    <article class="prose mb-4">
        <h2>{data.title}</h2>
        <h4>{data.excerpt}</h4>
    </article>
    <Divider></Divider>
    <ArticleList articles={api.getArticlesByCategory(data.slug)}/>
</div>
