"use client";

import { Textarea } from "@/components/ui/textarea";
import { useErrorStack } from "./atoms";

export const ErrorStackTextArea = () => {
  const [errorStack, setErrorStack] = useErrorStack();

  return (
    <Textarea
      id="error-stack"
      value={errorStack}
      onChange={(e) => setErrorStack(e.target.value)}
      placeholder="Paste error stack information..."
      className="min-h-[200px] resize-y font-mono text-sm"
    />
  );
};
