import dotenv from "dotenv";
import Web3 from "web3";
import PocketBase, { ListResult } from "pocketbase";
import type { Transaction, TransactionReceipt, Tx, TxRecord } from "./types.js";

dotenv.config();

// @ts-ignore
const web3 = new Web3(process.env.RPC_URL);

const pb = new PocketBase("https://jardoole.xyz");

await pb.collection("users").authWithPassword(process.env.PB_USER, process.env.PB_PW);

/**
 * Get pending transactions from pocketbase
 */
async function getPendingTxs() {
  return pb.collection("txs").getFullList<TxRecord>({ filter: "block = null" });
}

/**
 * Get broken transactions from pocketbase
 */
async function getMissingDistanceTxs() {
  return pb.collection("txs").getFullList<TxRecord>({ filter: "block != null && distance = 0" });
}

export type TxListResult = ListResult<TxRecord>

function monitorPendingTxs(maxPendingTxs = 10000) {
  setInterval(async () => {
    console.log("Fetching pending transactions from ethereum node");
    const pendingTxs = await getPendingTxs();

    console.log("Pending txs", pendingTxs.length);
    if (maxPendingTxs && pendingTxs.length > maxPendingTxs) {
      console.log("Too many pending txs, exiting");
      process.exit(1);
    }
  }, 1000);
}

/**
 * Fetch pending transactions from ethereum node and add them to pocketbase
 */
async function fetchPendingTxs() {
  console.log("Fetching pending transactions from ethereum node");

  monitorPendingTxs();

  web3.eth
    .subscribe("pendingTransactions", async (error: Error) => {
      if (error) console.log("error", error);
    })
    .on("data", async (hash: string) => {
      try {
        const tx = (await web3.eth.getTransaction(hash)) as Transaction;
        if (!(tx && tx.gas && tx.hash)) return;

        const data: Tx = {
          hash,
          firstBlock: await web3.eth.getBlockNumber(),
          gas: tx.gas,
          ...(tx.gasPrice && { gasPrice: tx.gasPrice }),
          ...(tx.maxFeePerGas && { maxFeePerGas: Number(tx.maxFeePerGas) }),
          ...(tx.maxPriorityFeePerGas && { maxPriorityFeePerGas: Number(tx.maxPriorityFeePerGas) })
        };
        if (!(data.hash && data.firstBlock)) {
          console.warn("Invalid tx", data);
        }
        await pb.collection("txs").create(data, { "$autoCancel": false });
      } catch (e) {
        console.error(JSON.stringify(e));
        process.exit(2);
      }
    });
}

/**
 * Fetch pending transactions from pocketbase and update them with block number
 */
async function updatePendingTxs() {
  console.log("Fetching pending transactions from pocketbase");
  const pendingTxs = await getPendingTxs();
  console.log("Pending txs", pendingTxs.length);
  monitorPendingTxs(0);
  const chunkSize = 100;
  for (let i = 0; i < pendingTxs.length; i += chunkSize) {
    console.log("Updating pending transactions", i, i + chunkSize);
    await Promise.all(pendingTxs.slice(i, i + chunkSize).map(async (tx) => {
      try {
        const _tx = (await web3.eth.getTransactionReceipt(tx.hash)) as TransactionReceipt;
        if (!(_tx && _tx.blockNumber)) return;
        await pb.collection("txs").update(tx.id,
          {
            block: _tx.blockNumber,
            distance: (Number(tx.firstBlock) - Number(_tx.blockNumber)).toString()
          }, { "$autoCancel": false });
      } catch (e) {
        console.error(tx, JSON.stringify(e));
        process.exit(1);
      }
    }));
  }
  /**
   * Exit the process after all pending transactions have been updated
   */
  console.log("All pending transactions have been updated");
  process.exit(0);
}

/**
 * Go through all pending transactions and remove them if they are older than 48 hours
 * This is to prevent the database from growing too large
 * This function should be run periodically
 */
async function cleanPendingTxs() {
  console.log("Fetching pending transactions from pocketbase");
  const pendingTxs = await getPendingTxs();
  console.log("Pending txs", pendingTxs.length);
  const chunkSize = 100;
  for (let i = 0; i < pendingTxs.length; i += chunkSize) {
    console.log("Cleaning pending transactions", i, i + chunkSize);
    await Promise.all(pendingTxs.slice(i, i + chunkSize).map(async (tx) => {
      try {
        await pb.collection("txs").delete(tx.id, { "$autoCancel": false });
      } catch (e) {
        console.error(tx, JSON.stringify(e));
        process.exit(1);
      }
    }));
  }

  /**
   * Exit the process after all pending transactions have been updated
   */
  console.log("All pending transactions have been cleaned");
  process.exit(0);
}

/**
 * Go through all finished transactions and fix the distance if it is missing
 */
async function fixMissingDistance() {
  console.log("Fetching missing distance transactions from pocketbase");
  const missingDistanceTxs = await getMissingDistanceTxs();
  console.log("Missing distance txs", missingDistanceTxs.length);
  const chunkSize = 100;
  for (let i = 0; i < missingDistanceTxs.length; i += chunkSize) {
    console.log("Fixing missing distance transactions", i, i + chunkSize);
    await Promise.all(missingDistanceTxs.slice(i, i + chunkSize).map(async (tx) => {
      try {
        await pb.collection("txs").update(tx.id,
          {
            distance: Number(tx.block) - Number(tx.firstBlock)
          }, { "$autoCancel": false });
      } catch (e) {
        console.warn(tx, JSON.stringify(e));
        //process.exit(1);
      }
    }));
  }
  console.log("All missing distance transactions have been fixed");
  process.exit(0);
}

/**
 * Help text displayed when running the script without arguments or with invalid arguments
 */
const help = `Usage: npm run start [pending|update]

  * pending - fetch pending transactions ethereum node and add them to pocketbase
  * update - fetch pending transactions from pocketbase and update them with block number
  * clean - remove all pending transactions from pocketbase
  * fix - fix transactions with missing distance
`;

/**
 * Read cli arguments from process.argv and check if they contain a valid command
 * Valid commands are:
 * - "pending" - fetch pending transactions ethereum node and add them to pocketbase
 * - "update" - fetch pending transactions from pocketbase and update them with block number
 * - "clean" - remove all pending transactions from pocketbase
 */
function readCli(): "pending" | "update" | "clean" | "fix" {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(help);
    process.exit(1);
  }
  const command = args[0];
  if (command !== "pending" && command !== "update" && command !== "clean" && command !== "fix") {
    console.log("Invalid command provided");
    console.log(help);
    process.exit(1);
  }
  return command;
}

const command = readCli();

switch (command) {
  case "pending":
    await fetchPendingTxs();
    break;
  case "update":
    await updatePendingTxs();
    break;
  case "clean":
    await cleanPendingTxs();
    break;
  case "fix":
    await fixMissingDistance();
    break;
}

/**
 * A more efficient way to check when pending transactions finish mining is to use the newBlockHeaders subscription
 */
/*web3.eth.subscribe("newBlockHeaders", (error: Error) => {
  if (error) console.log('error', error);
}).on("data", async (blockHeader: { hash: string }) => {
  const {transactions} = await web3.eth.getBlock(blockHeader.hash, true);
  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    if (tx.hash in pendingTransactions) {
      const pendingTx = pendingTransactions[tx.hash];
      minedTransactions[tx.hash] = {...pendingTx, mined: new Date().toISOString()};
      delete pendingTransactions[tx.hash];
    }
    if(Object.keys(minedTransactions).length > 100) {
      console.log("Mined tx cache is full, dumping txs to file");
      fs.writeFileSync("txs.json", JSON.stringify(minedTransactions));
      process.exit(0);
    }
    else{
      console.log("Mined tx cache size", Object.keys(minedTransactions).length);
    }
  }
});*/


//process.exit(0);
