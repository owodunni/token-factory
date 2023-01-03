<script lang="ts">
  export let data: { content: unknown; title: string };
</script>

<div class="prose prose-sm">
  <h1>{data.title}</h1>
</div>
<svelte:component this={data.content} />
