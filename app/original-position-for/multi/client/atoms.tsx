"use client";

import { createAtom } from "@/hooks/use-atom";
import { StoreContext } from "@/hooks/use-context-store";
import { createStore } from "zustand";
import { ParseMode, SharedAtoms } from "../../client/atoms";

interface Atoms extends SharedAtoms {
  errorStack: string;
}

const Store = createStore<Atoms>(() => ({
  mode: ParseMode.Multi,
  files: [],
  sourceMapConsumers: new Map(),
  errorStack: "",
  results: [],
  error: "",
  loading: false,
}));

export const AtomsRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <StoreContext.Provider value={Store}>{children}</StoreContext.Provider>;

export const useErrorStack = createAtom<Atoms>()("errorStack");
