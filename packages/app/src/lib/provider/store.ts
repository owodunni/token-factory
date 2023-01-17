import type { Ethereum, ProviderState, ProviderType } from './types';
import { createPersistentStore, keys } from '../store';
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const showWeb3Modal = writable(false);

const { state, getState } = createPersistentStore<ProviderState>(
  keys.providerState,
  getProviderState()
);

export const providerState = state;

export function availableProviders(): [] | [ProviderType] {
  if (!browser || !window.ethereum) return [];
  const ethereum = window.ethereum;
  return [ethereum.isMetaMask ? 'metamask' : ethereum.isOpera ? 'opera' : 'other'];
}

export const currentProvider = writable<Ethereum | null>(null);

/** Check if the injected provider is connected and update the store accordingly */
function getProviderState(): ProviderState {
  if (!browser) return { type: 'loading' };
  if (!window.ethereum) return { type: 'disconnected' };
  const ethereum = window.ethereum;

  const available = availableProviders();
  if (available.length === 0) return { type: 'disconnected' };

  if (ethereum.isConnected() && ethereum.selectedAddress && ethereum.chainId) {
    return {
      type: 'connected',
      chainId: Number(ethereum.chainId),
      selectedAddress: ethereum.selectedAddress,
      providerType: available[0]
    };
  }
  return { type: 'disconnected' };
}

const setState = (state: ProviderState) => providerState.set(state);
const stateChanged = () => setState(getProviderState());

const connected = (ethereum: Ethereum, state: ProviderState) => {
  ethereum.on('chainChanged', stateChanged);
  ethereum.on('accountsChanged', stateChanged);
  ethereum.on('connect', stateChanged);
  ethereum.on('disconnect', stateChanged);
  currentProvider.set(ethereum);
  return setState(state);
};

export const connect = async (): Promise<void> => {
  if (!window.ethereum) return;
  const ethereum = window.ethereum;

  let connectedState = getProviderState();
  if (connectedState.type === 'connected') {
    return connected(ethereum, connectedState);
  }

  /** Set loading to disable web3Modal button while Provider dialogs might be showing */
  providerState.set({ type: 'loading' });

  await ethereum.request({ method: 'eth_requestAccounts', jsonrpc: '2.0', id: 1 });
  connectedState = getProviderState();
  if (connectedState.type === 'connected') return connected(ethereum, connectedState);
  return disconnect();
};

const connectIfConnected = async () => {
  if (!browser || !window.ethereum) return;
  const ethereum = window.ethereum;

  const connectedState = getProviderState();
  if (connectedState.type === 'connected') {
    return connected(ethereum, connectedState);
  }
};

export const disconnect = (): void => {
  if (getState().type === 'disconnected') return;
  providerState.set({ type: 'disconnected' });
  currentProvider.set(null);
};

connectIfConnected();
