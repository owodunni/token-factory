<script lang="ts">
  import { Node, type Ethereum, type BlockWithTransactions } from '$lib/provider';
  import Chart from './Chart.svelte';
  import type { Data } from '../../visualization';

  export let provider: Ethereum;
  export let block: number;

  const range = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);

  const toHex = (n: number) => `0x${n.toString(16)}`;

  $: _block = (async () => {
    return provider
      ? Promise.all(
          range(block - 5, block).map((nmb) => Node.getBlockByNumber(provider, toHex(nmb), true))
        )
      : null;
  })();

  function toGwei(nmb: string) {
    return Number(nmb) / 1000000000.0;
  }

  function blockData(_block: BlockWithTransactions): Data[] {
    const blockBaseFee = toGwei(_block.baseFeePerGas);
    const blockGroup = Number(_block.number).toString();

    return _block.transactions.flatMap((tx) => {
      let priorityFee: number;
      if (tx.maxFeePerGas && tx.maxPriorityFeePerGas) {
        priorityFee = Math.min(
          toGwei(tx.maxPriorityFeePerGas),
          toGwei(tx.maxFeePerGas) - blockBaseFee
        );
      } else {
        priorityFee = toGwei(tx.gasPrice) - blockBaseFee;
      }
      if (priorityFee == 0) {
        return [];
      }
      return [
        {
          group: blockGroup,
          key: tx.hash,
          value: priorityFee
        }
      ];
    });
  }

  function blocksData(blocks: BlockWithTransactions[]): Data[] {
    return blocks.flatMap((block) => blockData(block));
  }
</script>

{#await _block}
  <p>...loading</p>
{:then block}
  <p>Priority fee:</p>
  <Chart data={blocksData(block)} />
  <p>Total gas:</p>
{:catch error}
  <p>{error}</p>
  <p>{JSON.stringify(error)}</p>
{/await}
