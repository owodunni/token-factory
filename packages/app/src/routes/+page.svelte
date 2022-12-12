<script lang="ts">
    import ArticleList from "$lib/components/ArticleList.svelte";
    import {api} from "$lib/api";

    const categories = api.getCategories();
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
        <ArticleList articles={api.getCategories()} />
    </div>
    {#each categories as category}
        <article class="prose">
            <h3>{category.title}</h3>
        </article>
        <ArticleList articles={api.getArticlesByCategory(category.slug)} />
    {/each}
</div>
