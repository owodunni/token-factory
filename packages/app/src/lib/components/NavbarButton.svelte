<script lang="ts">
  export let size: 'sm' | 'variable' = 'variable';

  export let modifiers = 'btn-ghost';

  let classes = size === 'sm' ? 'btn-circle' : 'mobile-only:!btn-circle';
  classes = `${classes} ${modifiers}`;
</script>

<button class="btn btn-sm border-0 {classes}" on:click>
  <slot />
</button>
