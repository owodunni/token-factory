<script lang="ts">
    import ArticleList from "../lib/components/ArticleList.svelte";
    import {api} from "$lib/api";
    import type {CardData} from "$lib/types";

    const categories = api.getCategories();

    function getArticles(category: string): CardData[] {
       return api.getArticlesByCategory(category).map((article) => {
          return {
             title: article.metadata.title,
             excerpt: article.metadata.excerpt,
              link: `/${category}/${article.metadata.slug}`,
          };
       });
    }

    function getCategories(): CardData[] {
       return api.getCategories().map((category) => {
          return {
             title: category.title,
             excerpt: category.excerpt,
             link: `/${category.slug}`,
          };
       });
    }
</script>

<div class="px-2">
    <div class="flex flex-col">
        <article class="prose">
            <h1>Token <span class="text-primary">Factory</span></h1>
            <h3>An educational tool for learning about DeFi.</h3>
        </article>
    </div>
    <div class="my-8">
        <article class="prose">
            <h2>Categories</h2>
        </article>
        <ArticleList articles={getCategories()} />
    </div>
    {#each categories as category}
        <article class="prose">
            <h3>{category.title}</h3>
        </article>
        <ArticleList articles={getArticles(category.slug)} />
    {/each}
</div>
