<script lang="ts">
    import type {CardData} from "../types";
    import ArticleCard from "$lib/components/ArticleCard.svelte";

    export let articles: CardData[];
</script>
<section
        class="flex flex-col">
    {#each articles as article}
        <ArticleCard {article}/>
    {/each}
</section>
