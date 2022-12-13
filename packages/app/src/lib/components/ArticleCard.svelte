<script lang="ts">
    import type {CardData} from "$lib/api";

    export let article: CardData;
</script>

<a href={article.link}
   on:click>
    <article class="prose">
        <h4 class="text-primary mb-0">{article.title}</h4>
        <p class="line-clamp-3">{article.excerpt}</p>
    </article>
</a>
