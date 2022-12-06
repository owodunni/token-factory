import type { ProviderState, ProviderType } from './types';
import { createPersistentStore, keys } from '../store';
import { browser } from '$app/environment';

export const providerState = createPersistentStore<ProviderState>(
	keys.providerState,
	getProviderState()
);

export function availableProviders(): [] | [ProviderType] {
	if (!browser || !window.ethereum) return [];
	const ethereum = window.ethereum;
	return [ethereum.isMetaMask ? 'metamask' : ethereum.isOpera ? 'opera' : 'other'];
}

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

export const connect = async (): Promise<void> => {
	if (!window.ethereum) return;
	const ethereum = window.ethereum;

	/** Set loading to disable web3Modal button while Provider dialogs might be showing */
	providerState.set({ type: 'loading' });

	let connectedState = getProviderState();
	if (connectedState.type === 'connected') return providerState.set(connectedState);

	await ethereum.request({ method: 'eth_requestAccounts', jsonrpc: '2.0', id: 1 });
	connectedState = getProviderState();
	if (connectedState.type === 'connected') return providerState.set(connectedState);
	return disconnect();
};

export const disconnect = (): void => {
	providerState.set({ type: 'disconnected' });
};
