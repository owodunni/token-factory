<script lang="ts">
 import type {Category} from "$lib/api";
 import ArticleList from "$lib/components/ArticleList.svelte";

 export let data: Category
 console.log(data)
</script>

<div>
    <article class="prose">
        <h2>{data.title}</h2>
        <p>{data.excerpt}</p>
    </article>
    <ArticleList category={data}/>
</div>
