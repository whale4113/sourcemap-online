"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useFiles, useError, useResults, useSourceMapConsumers } from "./atoms";

export const ClearFilesButton = () => {
  const [files, setFiles] = useFiles();
  const [, setSourceMapConsumers] = useSourceMapConsumers();
  const [, setResults] = useResults();
  const [, setError] = useError();

  const clearFiles = () => {
    setFiles([]);
    setSourceMapConsumers(new Map());
    setResults([]);
    setError("");
  };

  return (
    files.length > 0 && (
      <Button
        variant="outline"
        size="sm"
        onClick={clearFiles}
        className="flex items-center gap-2 text-foreground"
      >
        <X className="h-4 w-4" />
        清除所有文件
      </Button>
    )
  );
};
