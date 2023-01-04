<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';

  import '../prism-theme.css';
  import '../app.css';
</script>

<main data-sveltekit-prefetch>
  <div class="bg-base-100 min-h-screen">
    <Navbar />
    <div class="flex w-screen flex-col sm:place-items-center p-2 px-6 sm:p-0">
      <slot />
    </div>
  </div>
</main>
