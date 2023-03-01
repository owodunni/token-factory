/**
 * Get pending transactions from pocketbase
 */
import { pb, web3 } from "./api.js";
import { FeeHistory, Probability, ProbabilityDocument, TxRecord } from "./types.js";
import { transactions } from "./transactions.js";
import { range, toGwei } from "./util.js";

async function getProbability() {
  return (await pb.collection("documents").getOne<ProbabilityDocument>("g30checuyx7khyh")).data;
}

async function setProbability(probability: Probability) {
  await pb.collection("documents").update("g30checuyx7khyh", {data: probability});
}

async function getBlockFeesForBlocksThatTxsWhereNotIncludedIn(txs: TxRecord[], percentiles: number[]): Promise<Map<number, FeeHistory>> {
  const blockSet = new Set<number>();

  for (const tx of txs) {
    const { firstBlock, block, distance } = tx;
    if (!firstBlock || !block || !distance) continue;

    const blocks = range(Number(firstBlock) + 1, Number(block));
    blocks.forEach(block => blockSet.add(block));
  }

  console.log(`Fetching fee history for ${blockSet.size} blocks`)

  const map = new Map()
  for (const block of blockSet) {
    map.set(block, await web3.eth.getFeeHistory(1, block, percentiles ));
  }
  return map;
}

export async function calculateProbability() {
  const data = await getProbability();
  const txs = await transactions().getFullList<TxRecord>({ filter: "distance != null && distance > 2 && distance < 100" });
  console.log(`Calculating probability of ${txs.length} transactions not being included in a block`);

  const percentiles = range(1, 99, 1)
  data.rawCdf = (Array(percentiles.length)).fill( 0);
  data.cdf = (Array(percentiles.length)).fill( 0);
  data.samples = 0;

  console.log("Fetching fee history for blocks that transactions were not included in");

  /**
   * For each transaction, fetch the feeData for the blocks that the transaction was not included in and calculate the probability
   * that the transaction was not included in the block.
   *
   * To do this we need to:
   * 1. Calculate the priority fee per gas for each block that the transaction was not included in.
   * 2. Fetch the base fee per gas for each block that the transaction was not included in.
   * 3. Fetch the percentiles for each block that the transaction was not included in.
   * 4. Check which percentile the priority fee per gas falls into for each block that the transaction was not included in.
   * 5. Update data with the probability that the transaction was not included in the block.
   */
  const feeMap = await getBlockFeesForBlocksThatTxsWhereNotIncludedIn(txs, percentiles);

  function calculatePriorityFeeInBlock(tx: TxRecord, feeHistory: FeeHistory): number | null {
    const blockBaseFee = toGwei(feeHistory.baseFeePerGas[0]);
    if (tx.maxFeePerGas && tx.maxPriorityFeePerGas) {
      if(toGwei(tx.maxFeePerGas) < blockBaseFee) return null;
      return Math.min(
        toGwei(tx.maxPriorityFeePerGas),
        toGwei(tx.maxFeePerGas) - blockBaseFee
      );
    } else {
      if(toGwei(tx.gasPrice) < blockBaseFee) return null;
      return toGwei(tx.gasPrice) - blockBaseFee;
    }
  }

  for (const tx of txs) {
    const {firstBlock, block} = tx;
    if (!block) continue;
    const firstBlockWithoutTx = Number(firstBlock) + 1;
    const lastBlockWithoutTx = Number(block) - 1;
    for(let i = firstBlockWithoutTx; i <= lastBlockWithoutTx; i++) {
      const blockFee = feeMap.get(i);
      const priorityFeeInBlock = calculatePriorityFeeInBlock(tx, blockFee);
      if(!priorityFeeInBlock) continue;
      for(let j = 0; j < blockFee.reward[0].length; j++) {
        if (priorityFeeInBlock >= toGwei(blockFee.reward[0][j])) {
          for(let k = j; k >= 0; k--) {
           data.rawCdf[k] += 1;
          }
          data.samples += 1;
          continue;
        }
      }
    }
  }

  const samples = data.rawCdf[0];
  data.cdf = data.rawCdf.map((value) => value/ samples);
  data.percentiles = percentiles;

  await setProbability(data);

  console.log("Done calculating probability of transactions not being included in a block", data.cdf)
  console.log("Cdf" ,data.cdf)
  console.log("Raw Cdf" ,data.rawCdf)
  console.log("Samples" ,data.samples)

  process.exit(0)
}
