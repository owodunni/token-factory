<script>
  import { page } from '$app/stores';
  import Navbar from "../components/Navbar.svelte";
</script>

<Navbar/>
<article class="prose px-8 py-16">
<h1>{$page.status}: {$page.error?.message}</h1>
  <h3>Did you get lost? <a class="text-primary" href="/">Head home!</a></h3>
</article>
