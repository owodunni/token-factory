export interface BaseProviderState {
  type: 'connected' | 'disconnected' | 'loading';
}

export type ProviderType = 'metamask' | 'opera' | 'other';

export interface ConnectedProviderState extends BaseProviderState {
  type: 'connected';
  selectedAddress: string;
  chainId: number;
  providerType: ProviderType;
}

export interface DisconnectedProviderState extends BaseProviderState {
  type: 'disconnected';
}

export interface LoadingProviderState extends BaseProviderState {
  type: 'loading';
}

export type ProviderState =
  | ConnectedProviderState
  | DisconnectedProviderState
  | LoadingProviderState;

export interface EventEmitter {
  emit(eventName: string, args: never[]): EventEmitter;
  on(
    eventName: 'chainChanged' | 'accountsChanged' | 'connect' | 'disconnect',
    listener: EventListener
  ): EventEmitter;
  addListener(eventName: string, listener: EventListener): EventEmitter;
  removeListener(eventName: string, listener: EventListener): EventEmitter;
  removeAllListeners(eventName?: string): EventEmitter;
}

export type JSONRPCId = string | number | null;

export interface JSONRPCRequest {
  jsonrpc: '2.0';
  method: string;
  params?: unknown[] | object;
  id?: JSONRPCId;
}

export interface JSONRPCError {
  message: string;
  code: number;
  data?: unknown;
}

export interface JSONRPCResultResponse {
  jsonrpc: '2.0';
  id: JSONRPCId;
  result: unknown;
}

export interface JSONRPCErrorResponse {
  jsonrpc: '2.0';
  id: JSONRPCId;
  error: JSONRPCError;
}

export type JSONRPCResponse = JSONRPCErrorResponse | JSONRPCResultResponse;

export type JSONRPCCallback = (error: JSONRPCError | null, response: JSONRPCResponse) => unknown;

declare global {
  interface Window {
    ethereum?: Ethereum;
    web3?: { currentProvider: Ethereum };
  }
}

export interface Ethereum extends EventEmitter {
  isOpera?: boolean;
  isMetaMask?: boolean;
  _metamask?: { isUnlocked: () => boolean };
  chainId: string | null;
  networkVersion: string | null;

  selectedAddress: string | null;

  enable(): Promise<string>;

  isConnected(): boolean;

  send(
    requestOrMethod: JSONRPCRequest | string,
    callbackOrParams?: JSONRPCCallback | unknown[]
  ): Promise<JSONRPCResponse>;

  request(request: JSONRPCRequest): Promise<unknown>;
}

export type Provider = Pick<Ethereum, 'request'>;
export type BlockHash = string;
export type BlockNumber = string;
export type TransactionHash = string;
export type HexString = string;
export type Address = string;
export type BlockTag = 'latest' | 'earliest' | 'finalized' | 'safe' | 'pending';

export type FeeHistory = {
  baseFeePerGas: string[];
  gasUsedRatio: number[];
  oldestBlock: BlockHash;
  reward: string[][];
};

export type Transaction = {
  accessList: { address: Address; storageKeys: HexString[] }[];
  blockHash: BlockHash;
  blockNumber: BlockNumber;
  chainId: HexString;
  from: Address;
  gas: HexString;
  gasPrice: HexString;
  hash: TransactionHash;
  input: HexString;
  maxFeePerGas: HexString;
  maxPriorityFeePerGas: HexString;
  nonce: HexString;
  r: HexString;
  s: HexString;
  to: HexString;
  transactionIndex: HexString;
  type: HexString;
  v: HexString;
  value: HexString;
};

type _Block = {
  parentHash: string;
  sha3Uncles: string;
  miner: string;
  stateRoot: string;
  transactionsRoot: string;
  receiptsRoot: string;
  logsBloom: string;
  difficulty: string;
  number: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  extraData: string;
  mixHash: string;
  nonce: string;
  totalDifficulty: string;
  size: string;
  baseFeePerGas: string;
  transactions: string[];
  uncles: string[];
};

export type BlockWithoutTransactions = _Block;
export type BlockWithTransactions = _Block & { transactions: Transaction[] };
export type Block = BlockWithoutTransactions | BlockWithTransactions;
