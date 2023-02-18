import dotenv from "dotenv";
import Web3 from "web3";
import PocketBase from "pocketbase";
import type { Transaction, Tx, TxRecord } from "./types.js";

dotenv.config();

// @ts-ignore
const web3 = new Web3(process.env.RPC_URL);

const pb = new PocketBase("https://jardoole.xyz");

await pb.collection("users").authWithPassword(process.env.PB_USER, process.env.PB_PW);

/**
 * Get pending transactions from pocketbase
 */
async function getPendingTxs() {
  return pb.collection("txs").getFullList<TxRecord>({filter: 'block = null'})
}

function monitorPendingTxs(maxPendingTxs = 10000) {
  setInterval(async () => {
    console.log("Fetching pending transactions from ethereum node");
    let pendingTxs = await getPendingTxs();

    console.log("Pending txs", pendingTxs.length)
    if ( maxPendingTxs && pendingTxs.length > maxPendingTxs) {
      console.log("Too many pending txs, exiting");
      process.exit(1)
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
      try{
        const tx = (await web3.eth.getTransaction(hash)) as Transaction;
        if(!(tx && tx.gas && tx.hash)) return;

        const data: Tx = {
          hash,
          firstBlock: await web3.eth.getBlockNumber(),
          gas: tx.gas,
          ...(tx.gasPrice && {gasPrice: tx.gasPrice}),
          ...(tx.maxFeePerGas && {maxFeePerGas: Number(tx.maxFeePerGas)}),
          ...(tx.maxPriorityFeePerGas && {maxPriorityFeePerGas: Number(tx.maxPriorityFeePerGas)}),
        };
        if(!(data.hash && data.firstBlock)) {
          console.warn("Invalid tx", data);
        }
        await pb.collection("txs").create(data, {'$autoCancel': false})
      }catch (e) {
        console.error(JSON.stringify(e));
        process.exit(2)
      }
    });
}

/**
 * Fetch pending transactions from pocketbase and update them with block number
 */
async function updatePendingTxs() {
  console.log("Fetching pending transactions from pocketbase")
  const pendingTxs = await getPendingTxs();
  console.log("Pending txs", pendingTxs.length);
  monitorPendingTxs(0);
  const chunkSize = 100;
  for(let i = 0; i < pendingTxs.length; i += chunkSize) {
    console.log("Updating pending transactions", i, i + chunkSize);
    await Promise.all(pendingTxs.slice(i, i + chunkSize).map(async (tx) => {
      try {
        const _tx = await web3.eth.getTransaction(tx.hash)
        if (!(_tx && _tx.blockNumber)) return
        await pb.collection("txs").update(tx.id, { block: _tx.blockNumber }, { '$autoCancel': false })
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
 * Help text displayed when running the script without arguments or with invalid arguments
 */
const help = `Usage: npm run start [pending|update]

pending - fetch pending transactions ethereum node and add them to pocketbase
update - fetch pending transactions from pocketbase and update them with block number
`;

/**
 * Read cli arguments from process.argv and check if they contain a valid command
 * Valid commands are:
 * - "pending" - fetch pending transactions ethereum node and add them to pocketbase
 * - "update" - fetch pending transactions from pocketbase and update them with block number
 */
function readCli(): "pending" | "update" {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("No command provided");
    process.exit(1);
  }
  const command = args[0];
  if (command !== "pending" && command !== "update") {
    console.log("Invalid command provided");
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
