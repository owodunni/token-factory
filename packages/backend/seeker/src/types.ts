import type { Record } from "pocketbase"
import { ListResult } from "pocketbase";

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
export type TxListResult = ListResult<TxRecord>

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

export interface EventLog {
  event: string;
  address: string;
  returnValues: any;
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  raw?: {data: string; topics: any[]};
}

export interface Log {
  address: string;
  data: string;
  topics: string[];
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  removed: boolean;
}

export interface TransactionReceipt {
  status: boolean;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string;
  contractAddress?: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  effectiveGasPrice: number;
  logs: Log[];
  logsBloom: string;
  events?: {
    [eventName: string]: EventLog;
  };
}

export interface FeeHistory {
  baseFeePerGas: string[];
  gasUsedRatio: number[];
  oldestBlock: number;
  reward: string[][];
}

export type Probability = {cdf: number[], samples: number, rawCdf: number[], percentiles: number[]}
export type ProbabilityDocument = Record & {data: Probability }
