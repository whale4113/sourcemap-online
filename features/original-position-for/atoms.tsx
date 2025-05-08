"use client";

import { createStore } from "zustand";
import { SourceMapConsumer } from "source-map-js";
import { createAtom } from "@/hooks/use-atom";
import { StoreContext } from "@/hooks/use-context-store";

export interface FileUpload {
  file: File;
  type: "source" | "sourcemap";
}

export interface ParsedResult {
  source: string;
  line: number;
  column: number;
  name?: string;
  status?: "success" | "missing";
}

export enum ParseMode {
  Single,
  Multi,
}

export interface SharedAtoms {
  mode: ParseMode;
  files: FileUpload[];
  sourceMapConsumers: Map<string, SourceMapConsumer>;
  loading: boolean;
  error: string;
  results: ParsedResult[];
}

export const useMode = createAtom<SharedAtoms>()("mode");
export const useFiles = createAtom<SharedAtoms>()("files");
export const useSourceMapConsumers =
  createAtom<SharedAtoms>()("sourceMapConsumers");
export const useError = createAtom<SharedAtoms>()("error");
export const useLoading = createAtom<SharedAtoms>()("loading");
export const useResults = createAtom<SharedAtoms>()("results");

interface MultiAtoms extends SharedAtoms {
  errorStack: string;
}

const MultiStore = createStore<MultiAtoms>(() => ({
  mode: ParseMode.Multi,
  files: [],
  sourceMapConsumers: new Map(),
  errorStack: "",
  results: [],
  error: "",
  loading: false,
}));

export const MultiAtomsRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <StoreContext.Provider value={MultiStore}>{children}</StoreContext.Provider>
);

export const useErrorStack = createAtom<MultiAtoms>()("errorStack");

interface SingleAtoms extends SharedAtoms {
  selectedFileName: string | null;
  generatedLine: number;
  generatedColumn: number;
}

const SingleStore = createStore<SingleAtoms>(() => ({
  mode: ParseMode.Single,
  files: [],
  sourceMapConsumers: new Map(),
  selectedFileName: null,
  generatedLine: 1,
  generatedColumn: 0,
  results: [],
  error: "",
  loading: false,
}));

export const SingleAtomsRoot = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <StoreContext.Provider value={SingleStore}>{children}</StoreContext.Provider>
);

export const useSelectedFileName = createAtom<SingleAtoms>()("selectedFileName");
export const useGeneratedLine = createAtom<SingleAtoms>()("generatedLine");
export const useGeneratedColumn = createAtom<SingleAtoms>()("generatedColumn");
