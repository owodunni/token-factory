<script lang=ts>
	import Navbar from "$lib/components/Navbar.svelte";

  import "../app.css";
</script>

<main data-sveltekit-prefetch>
  <div class="bg-base-200 h-screen">
    <Navbar/>
    <div class="flex w-screen flex-col sm:place-items-center">
      <slot />
      </div>
  </div>
</main>
