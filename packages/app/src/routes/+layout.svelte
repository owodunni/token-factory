<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';

  import { browser } from '$app/environment';
  import 'prism-themes/themes/prism-material-light.css';
  import '../app.css';

  function toggleTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      import('prism-themes/themes/prism-material-dark.css');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      import('prism-themes/themes/prism-material-light.css');
    }
  }

  if (browser) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => toggleTheme());
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', () => toggleTheme());
    toggleTheme();
  }
</script>

<main data-sveltekit-prefetch>
  <div class="bg-base-100 min-h-screen">
    <Navbar />
    <div class="flex w-screen flex-col sm:place-items-center">
      <slot />
    </div>
  </div>
</main>
