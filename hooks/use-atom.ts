import { useCallback } from "react";
import { useStore } from "zustand";
import { useContextStore } from "./use-context-store";

const normalizeNewState = <T>(
  oldState: T,
  newState: T | ((oldState: T) => T)
): T => {
  if (typeof newState === "function") {
    // @ts-expect-error state is not a function
    return newState(oldState);
  }

  return newState;
};

type SetState<T> = (state: T | ((oldState: T) => T)) => void;

const useAtom = <T, U extends keyof T>(key: U): [T[U], SetState<T[U]>] => {
  const store = useContextStore<T>();
  if (!store) throw new Error("useContextStore is not initialized");

  const state = useStore(store, (state) => state[key]);

  const setState = useCallback<SetState<T[U]>>(
    (newState) => {
      if (!store) throw new Error("useContextStore is not initialized");

      store.setState((oldGlobalState) => ({
        ...oldGlobalState,
        [key]: normalizeNewState(oldGlobalState[key], newState),
      }));
    },
    [store, key]
  );

  return [state, setState];
};

export const createAtom =
  <T>(): (<U extends keyof T>(key: U) => () => [T[U], SetState<T[U]>]) =>
  <U extends keyof T>(key: U) =>
  () =>
    useAtom<T, U>(key);
