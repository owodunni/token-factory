<script lang="ts">
    import type {PostMetadata} from "../api";

    export let post: PostMetadata;
</script>

<a href="/blog/{post.metadata.post}"
   on:click
   class="rounded-md flex-none snap-always snap-center rounded-md bg-base-100 w-60 h-48 shadow-lg p-4 hover:scale-[1.03] mx-1">
    <article class="prose">
        <h2>{post.metadata.title}</h2>
        <p class="line-clamp-3">{post.metadata.excerpt}</p>
    </article>
</a>
