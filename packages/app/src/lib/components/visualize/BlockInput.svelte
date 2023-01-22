<script lang="ts">
  import { blockNumber } from '../../visualization';
</script>

<div class="flex flex-row justify-between">
  <div>
    <p>Block number:</p>
    <input
      type="number"
      placeholder="Block"
      class="input input-bordered  w-full max-w-xs"
      bind:value={$blockNumber}
    />
  </div>
</div>
