"use client";

import { createContext, useContext } from "react";
import { StoreApi } from "zustand";

export const StoreContext = createContext<StoreApi<unknown> | null>(null);

export const useContextStore = <T>() =>
  useContext(StoreContext) as StoreApi<T> | null;
