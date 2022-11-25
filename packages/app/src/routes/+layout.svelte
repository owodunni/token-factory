<script lang=ts>
	import Navbar from "$lib/components/Navbar.svelte";

  import "../app.css";
</script>

<Navbar/>
<main data-sveltekit-prefetch>
  <slot />
</main>
