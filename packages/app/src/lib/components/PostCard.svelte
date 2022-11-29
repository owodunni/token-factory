<script lang="ts">
    import type {PostMetadata} from "$lib/api";

    export let post: PostMetadata
</script>
<div class="p-2 my-2 rounded-lg bg-base-100 max-w-sm">
    <article class="prose">
        <h2>{post.metadata.title}</h2>
        <p>{post.metadata.excerpt}</p>
    </article>
</div>