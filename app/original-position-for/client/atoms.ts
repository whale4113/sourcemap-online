"use client";

import { createAtom } from "@/hooks/use-atom";
import { SourceMapConsumer } from "source-map-js";

export interface FileUpload {
  file: File;
  type: "source" | "sourcemap";
}

export interface ParsedResult {
  source: string;
  line: number;
  column: number;
  name?: string;
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
