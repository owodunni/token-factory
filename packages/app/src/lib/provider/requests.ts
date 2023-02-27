import type {
  BlockHash,
  BlockTag,
  Provider,
  FeeHistory,
  Block,
  BlockNumber,
  Transaction,
  Receipt
} from './types';

let id = 1;

export const feeHistory = async (
  provider: Provider,
  blockCount: number,
  newestBlock: BlockNumber | BlockTag,
  rewardPercentiles: number[]
): Promise<FeeHistory> =>
  (await provider.request({
    id: id++,
    jsonrpc: '2.0',
    method: 'eth_feeHistory',
    params: [blockCount, newestBlock, rewardPercentiles]
  })) as FeeHistory;

export const blockNumber = async (provider: Provider): Promise<string> =>
  (await provider.request({
    id: id++,
    jsonrpc: '2.0',
    method: 'eth_blockNumber',
    params: []
  })) as string;

export const getBlockByHash = async (
  provider: Provider,
  hash: BlockHash,
  includeTransactions: boolean
): Promise<Block> =>
  (await provider.request({
    id: id++,
    jsonrpc: '2.0',
    method: 'eth_getBlockByHash',
    params: [hash, includeTransactions]
  })) as Block;

export const getBlockByNumber = async (
  provider: Provider,
  number: BlockNumber | BlockTag,
  includeTransactions: boolean
): Promise<Block> =>
  (await provider.request({
    id: id++,
    jsonrpc: '2.0',
    method: 'eth_getBlockByNumber',
    params: [number, includeTransactions]
  })) as Block;

export const getTransactionByHash = async (
  provider: Provider,
  hash: string
): Promise<Transaction> =>
  (await provider.request({
    id: id++,
    jsonrpc: '2.0',
    method: 'eth_getTransactionByHash',
    params: [hash]
  })) as Transaction;

export const getTransactionReceipt = async (provider: Provider, hash: string): Promise<Receipt> =>
  (await provider.request({
    id: id++,
    jsonrpc: '2.0',
    method: 'eth_getTransactionReceipt',
    params: [hash]
  })) as Receipt;
