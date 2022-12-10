<script lang="ts">
    import type {CardData} from "../types";

    export let article: CardData;
</script>

<a href={article.link}
   on:click>
    <article class="prose">
        <h2>{article.title}</h2>
        <p class="line-clamp-3">{article.excerpt}</p>
    </article>
</a>
