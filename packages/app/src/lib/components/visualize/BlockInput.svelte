<script lang="ts">
  import { blockNumber } from '../../visualization';
  import { currentProvider } from '../../provider';
</script>

<div class="flex flex-row justify-between">
  <div>
    <p>Block number:</p>
    <input
      disabled={$currentProvider === null}
      type="number"
      placeholder="Block"
      class="input input-bordered  w-full max-w-xs"
      bind:value={$blockNumber}
    />
  </div>
</div>
