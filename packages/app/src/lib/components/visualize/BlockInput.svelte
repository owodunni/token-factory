<script lang="ts">
  import { type Ethereum } from '$lib/provider';

  export let provider: Ethereum;
  export let initialBlock: number;
</script>

<div class="flex flex-row justify-between">
  <div>
    <p>Block number:</p>
    <input
      type="number"
      placeholder="Block"
      class="input input-bordered  w-full max-w-xs"
      bind:value={initialBlock}
    />
  </div>
</div>
<slot {provider} block={initialBlock} />
