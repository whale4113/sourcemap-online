"use client";

import { Button } from "@/components/ui/button";
import { useMode, ParseMode, useLoading, useFiles } from "./atoms";
import { useParsePosition } from "./use-parse-position";
import { useParseStack } from "./use-parse-stack";

interface SubmitButtonProps {
  children?: React.ReactNode;
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const { children } = props;

  const [mode] = useMode();
  const [loading] = useLoading();
  const [files] = useFiles();
  const { parsePosition } = useParsePosition();
  const { parseStack } = useParseStack();

  const handleParse = () => {
    if (mode === ParseMode.Single) {
      parsePosition();
    } else {
      parseStack();
    }
  };

  return (
    <Button
      onClick={handleParse}
      disabled={loading || files.length === 0}
      className="w-full h-12 text-base font-medium shadow-lg transition-all duration-200 text-primary-foreground"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Parsing...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
