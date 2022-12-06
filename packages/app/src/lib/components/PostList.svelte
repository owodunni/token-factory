<script lang="ts">
    import type {PostMetadata} from "$lib/api";
    import PostCard from "$lib/components/PostCard.svelte";

    export let posts: PostMetadata[];
    export let category: string;
</script>
<article class="prose">
    <h3>{category}</h3>
</article>
<div class="flex place-items-center">
    <section
            class="flex flex-nowrap overflow-x-auto snap-mandatory gap-5 no-scrollbar py-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {#each posts as post}
            <PostCard {post}/>
        {/each}
    </section>
</div>
