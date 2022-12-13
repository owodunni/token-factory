<script lang="ts">
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import type {CardData} from "$lib/api";

    export let articles: CardData[];
</script>
<section
        class="flex flex-col gap-y-4">
    {#each articles as article}
        <ArticleCard {article}/>
    {/each}
</section>
