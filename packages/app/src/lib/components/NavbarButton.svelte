<script lang="ts">
  export let size: 'sm' | 'variable' = 'variable';

  export let modifiers = '';

  const classes = size === 'sm' ? 'btn-circle' : 'mobile-only:!btn-circle';
</script>

<button class="btn btn-sm border-0 btn-ghost {`${classes} ${modifiers}`}" on:click>
  <slot />
</button>
