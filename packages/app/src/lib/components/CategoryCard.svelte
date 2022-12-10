<script lang="ts">
    import type {Category} from "../api";

    export let category: Category;
</script>

<a href="/{category.slug}"
   on:click
   class="rounded-md flex-none snap-always snap-center rounded-md bg-base-100 w-60 h-24 shadow-lg p-4 hover:scale-[1.03] mx-1">
    <article class="prose">
        <h2>{category.title}</h2>
    </article>
</a>
