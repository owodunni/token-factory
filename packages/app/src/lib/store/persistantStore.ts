import { browser } from '$app/environment';
import { type Writable, writable } from 'svelte/store';

/**
 * Create a {@link writable} store that persists its value in `localStorage`.
 */
export function createPersistentStore<T>(
  key: string,
  initialState: T
): { state: Writable<T>; getState: () => T } {
  /** Prefix {@link key} to easier keep track of them when debugging */
  const storageKey = `ui-${key}`;

  const getState = (): T =>
    JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(initialState));

  const getInitialState = (): T => {
    if (browser) {
      // Trust that we have manage to get the initial state from the provider
      if (window.ethereum) return initialState;
      else getState();
    }
    return initialState;
  };

  const state = writable(getInitialState());

  if (browser) {
    state.subscribe((value) => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    });
  }

  return { state, getState };
}
