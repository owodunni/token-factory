<script lang="ts">
  import { type Ethereum } from '$lib/provider';

  export let provider: Ethereum;
  export let initialBlock: number;

  export let percentiles: string = [25, 50, 75].join(', ');
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
  <div>
    <p>Percentiles:</p>
    <input
      type="text"
      placeholder="Percentiles [25, 50, 75]"
      class="input input-bordered  w-full max-w-xs"
      bind:value={percentiles}
    />
  </div>
</div>
<slot {provider} block={initialBlock} {percentiles} />
