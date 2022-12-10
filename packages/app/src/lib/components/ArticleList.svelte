<script lang="ts">
    import type {Category} from "$lib/api";
    import ArticleCard from "./ArticleCard.svelte";
    import {api} from "$lib/api";

    export let category: Category;
    let articles = api.getArticlesByCategory(category.slug);
</script>
<div class="flex place-items-center">
    <section
            class="flex flex-nowrap overflow-x-auto snap-mandatory gap-5 no-scrollbar py-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {#each articles as article}
            <ArticleCard {article}/>
        {/each}
    </section>
</div>
