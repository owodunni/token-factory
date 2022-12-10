<script lang="ts">
    import type {Category} from "$lib/api";
    import CategoryCard from "$lib/components/CategoryCard.svelte";

    export let categories: Category[];
</script>
<div class="flex place-items-center">
    <section
            class="flex flex-nowrap overflow-x-auto snap-mandatory gap-5 no-scrollbar py-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {#each categories as category}
            <CategoryCard {category}/>
        {/each}
    </section>
</div>
