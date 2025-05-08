"use client";

import { X } from "lucide-react";
import { useFiles, useSourceMapConsumers } from "./atoms";

export const UploadedFiles = () => {
  const [files, setFiles] = useFiles();
  const [, setSourceMapConsumers] = useSourceMapConsumers();

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles((prev) => prev.filter((_, i) => i !== index));

    // 如果是 source map 文件，同时删除对应的 consumer
    if (fileToRemove.type === "sourcemap") {
      setSourceMapConsumers((prev) => {
        const newMap = new Map(prev);
        newMap.delete(fileToRemove.file.name);
        return newMap;
      });
    }
  };

  return (
    files.length > 0 && (
      <div className="mt-4 space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-muted-foreground/10"
          >
            <div className="flex items-center gap-2 whitespace-pre-wrap break-all">
              <span className="text-sm font-medium">{file.file.name}</span>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="p-1 hover:bg-muted-foreground/10 rounded-md transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    )
  );
};
