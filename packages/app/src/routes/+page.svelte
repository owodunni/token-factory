<script>
  import PostList from "$lib/components/PostList.svelte";
  import {api} from "$lib/api";
  const posts = api.getPosts();
</script>

<div>
  <div class="sm:p-8 p-4">
    <article class="prose">
      <h1>Token <span class="text-primary">Factory</span></h1>
      <h3>An educational tool for learning about DeFi.</h3>
    </article>
    <div class="my-4 flex space-x-4">
      <a class="btn" href="/blog">About</a>
      <button class="btn btn-primary">Mint</button>
    </div>
  </div>
  <div class="sm:px-8">
    <PostList posts={posts} />
  </div>
</div>
