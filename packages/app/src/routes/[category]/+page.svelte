<script lang="ts">
 import type {Category} from "$lib/api";
 import ArticleList from "$lib/components/ArticleList.svelte";
 import type {CardData} from "$lib/types";
 import {api} from "$lib/api";

 export let data: Category
 function getArticles(category: string): CardData[] {
     return api.getArticlesByCategory(category).map((article) => {
         return {
             title: article.metadata.title,
             excerpt: article.metadata.excerpt,
             link: `/${category}/${article.metadata.slug}`,
         };
     });
 }
</script>

<div>
    <article class="prose">
        <h2>{data.title}</h2>
        <p>{data.excerpt}</p>
    </article>
    <ArticleList articles={getArticles(data.slug)}/>
</div>
