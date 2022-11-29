<script lang=ts>
	import Navbar from "$lib/components/Navbar.svelte";

  import "../app.css";
</script>

<main data-sveltekit-prefetch>
  <div class="bg-base-300 h-screen">
    <Navbar/>
    <div class="flex place-content-center">
      <slot />
    </div>
  </div>
</main>
