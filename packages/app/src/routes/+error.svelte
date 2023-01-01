<script>
  import { page } from '$app/stores';
</script>

<article class="prose">
  <h1>{$page.status}: {$page.error?.message}</h1>
  <h3>Did you get lost? <a class="text-primary" href="/">Head home!</a></h3>
</article>
