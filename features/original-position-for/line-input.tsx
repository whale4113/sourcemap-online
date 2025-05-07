"use client";

import { Input } from "@/components/ui/input";
import { useGeneratedLine } from "./atoms";

export const LineInput = () => {
  const [generatedLine, setGeneratedLine] = useGeneratedLine();

  return (
    <Input
      id="line"
      type="number"
      value={generatedLine}
      onChange={(e) => setGeneratedLine(Number(e.target.value))}
      className="h-12 text-base"
      min={1}
    />
  );
};
