<script lang="ts">
    import type{PostMetadata} from "$lib/api";
    import PostCard from "$lib/components/PostCard.svelte";

    export let posts: PostMetadata[];
</script>
{#each posts as post}
    <PostCard {post} />
{/each}