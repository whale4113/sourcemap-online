"use client";

import { createAtom } from "@/hooks/use-atom";
import { StoreContext } from "@/hooks/use-context-store";
import { createStore } from "zustand";
import { FileUpload, ParseMode, SharedAtoms } from "../../client/atoms";

interface Atoms extends SharedAtoms {
  selectedFile: FileUpload | null;
  generatedLine: number;
  generatedColumn: number;
}

const Store = createStore<Atoms>(() => ({
  mode: ParseMode.Single,
  files: [],
  sourceMapConsumers: new Map(),
  selectedFile: null,
  generatedLine: 1,
  generatedColumn: 0,
  results: [],
  error: "",
  loading: false,
}));

export const AtomsRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <StoreContext.Provider value={Store}>{children}</StoreContext.Provider>;

export const useSelectedFile = createAtom<Atoms>()("selectedFile");
export const useGeneratedLine = createAtom<Atoms>()("generatedLine");
export const useGeneratedColumn = createAtom<Atoms>()("generatedColumn");
