<script lang=ts>
	import Navbar from "$lib/components/Navbar.svelte";

  import "../app.css";
</script>

<Navbar/>
<main data-sveltekit-prefetch>
  <div class="p-8 flex place-content-center">
    <slot />
  </div>
</main>
