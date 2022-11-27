<script lang="ts">
 export let data: {posts: {route: string, name: string}}
</script>
<div class="flex flex-col">
    {#each data.posts as post}
            <a class="btn m-4 w-32" href={post.route}>{post.name}</a>
    {/each}
</div>