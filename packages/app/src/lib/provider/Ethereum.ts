import type { EventEmitter } from './EventEmitter';

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
