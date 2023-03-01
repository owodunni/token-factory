import type { TxRecord } from "./types.js";
import { cleanPendingTxs, fetchPendingTxs, fixMissingDistance, updatePendingTxs } from "./transactions.js";
import { ListResult } from "pocketbase";
import { calculateProbability } from "./probability.js";

export type TxListResult = ListResult<TxRecord>

/**
 * Help text displayed when running the script without arguments or with invalid arguments
 */
const help = `Usage: npm run start [command]

Commands:
  * pending - fetch pending transactions ethereum node and add them to pocketbase
  * update - fetch pending transactions from pocketbase and update them with block number
  * clean - remove all pending transactions from pocketbase
  * fix - fix transactions with missing distance
  * probability - calculate probability of a transaction being included in a block
  * help - display this help text
`;

/**
 * Read cli arguments from process.argv and check if they contain a valid command
 * Valid commands are:
 * - "pending" - fetch pending transactions ethereum node and add them to pocketbase
 * - "update" - fetch pending transactions from pocketbase and update them with block number
 * - "clean" - remove all pending transactions from pocketbase
 * - "fix" - fix transactions with missing distance
 * - "probability" - calculate probability of a transaction being included in a block
 * - "help" - display this help text
 */
function readCli(): "pending" | "update" | "clean" | "fix" | "probability" | "help" {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(help);
    process.exit(1);
  }
  const command = args[0];
  if (command !== "pending" && command !== "update" && command !== "clean" && command !== "fix" && command !== "probability" && command !== "help") {
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
  case "probability":
    await calculateProbability();
    break;
  case "help":
    console.log(help);
    process.exit(0);
    break;
}
