<script>
    import PostList from "$lib/components/PostList.svelte";
    import {api} from "$lib/api";

    const posts = api.getPosts();
</script>

<div class="px-2">
    <div class="flex flex-col">
        <article class="prose">
            <h1>Token <span class="text-primary">Factory</span></h1>
            <h3>An educational tool for learning about DeFi.</h3>
        </article>
        <div class="my-4 flex gap-2">
            <a class="btn" href="/blog">About</a>
            <button class="btn btn-primary">Mint</button>
        </div>
    </div>
    <PostList posts={posts} category="Web3"/>
</div>
