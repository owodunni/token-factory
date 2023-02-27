import type { Record } from "pocketbase"

export type Tx = {
  hash: string,
  firstBlock: string,
  block?: string,
  distance?: string,
  gas?: number,
  gasPrice?: string,
  maxFeePerGas?: number,
  maxPriorityFeePerGas?: number
};

export type TxRecord = Record & Tx;

export interface Transaction {
  hash: string;
  nonce: number;
  blockHash: string | null;
  blockNumber: number | null;
  transactionIndex: number | null;
  from: string;
  to: string | null;
  value: string;
  gasPrice: string;
  maxPriorityFeePerGas?: number | string;
  maxFeePerGas?: number | string;
  gas: number;
  input: string;
}
