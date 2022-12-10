<script lang="ts">
    import type {ArticleMetaData} from "../api";

    export let article: ArticleMetaData;
</script>

<a href="/{article.category}/{article.metadata.slug}"
   on:click
   class="rounded-md flex-none snap-always snap-center rounded-md bg-base-100 w-60 h-48 shadow-lg p-4 hover:scale-[1.03] mx-1">
    <article class="prose">
        <h2>{article.metadata.title}</h2>
        <p class="line-clamp-3">{article.metadata.excerpt}</p>
    </article>
</a>
