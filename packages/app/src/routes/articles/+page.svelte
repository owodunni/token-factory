<script>
    import ArticleList from "$lib/components/ArticleList.svelte";
    import {api} from "$lib/api";
    import Divider from "$lib/components/Divider.svelte";
</script>

<div class="my-4">
    <article class="prose mb-4">
        <h2>Categories</h2>
    </article>
    <ArticleList articles={api.getCategories()} />
    <Divider></Divider>
    <article class="prose mb-4">
        <h2>Articles</h2>
    </article>
    <ArticleList articles={api.getArticlesByCategory()} />
    <Divider></Divider>
</div>
