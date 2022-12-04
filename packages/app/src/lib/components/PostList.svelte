<script lang="ts">
    import type {PostMetadata} from "$lib/api";

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
            <a href="/blog/{post.metadata.post}"
               class="rounded-md flex-none snap-always snap-center rounded-md bg-base-100 w-60 h-48 shadow-lg p-4 hover:scale-[1.03] mx-1">
                <article class="prose">
                    <h2>{post.metadata.title}</h2>
                    <p class="line-clamp-3">{post.metadata.excerpt}</p>
                </article>
            </a>
        {/each}
    </section>
</div>
