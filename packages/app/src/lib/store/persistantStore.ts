import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/**
 * Create a {@link writable} store that persists its value in `localStorage`.
 */
export function createPersistentStore<T>(key: string, initialState: T) {
  /** Prefix {@link key} to easier keep track of them when debugging */
  const storageKey = `ui-${key}`;

  const getInitialState = (): T => {
    if (browser) {
      // Trust that we have manage to get the initial state from the provider
      if (window.ethereum) return initialState;
      else return JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(initialState));
    }
    return initialState;
  };

  const state = writable(getInitialState());

  if (browser) {
    state.subscribe((value) => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
  }

  return state;
}
