"use client";

import { Input } from "@/components/ui/input";
import { useGeneratedColumn } from "./atoms";

export const ColumnInput = () => {
  const [generatedColumn, setGeneratedColumn] = useGeneratedColumn();

  return (
    <Input
      id="column"
      type="number"
      value={generatedColumn}
      onChange={(e) => setGeneratedColumn(Number(e.target.value))}
      className="h-12 text-base"
      min={0}
    />
  );
};
