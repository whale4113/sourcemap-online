"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectedFileName, useSourceMapConsumers } from "./atoms";
import { useEffect, useMemo } from "react";
import { trimPathExtension } from "@/lib/utils";

export const FileSelect = () => {
  const [sourceMapConsumers] = useSourceMapConsumers();
  const [selectedFileName, setSelectedFileName] = useSelectedFileName();

  const files = useMemo(
    () => Array.from(sourceMapConsumers.keys()),
    [sourceMapConsumers]
  );
  useEffect(() => {
    if (selectedFileName && !files.includes(selectedFileName)) {
      setSelectedFileName(files.at(0) ?? null);
    }
  }, [selectedFileName, files]);

  return (
    sourceMapConsumers.size > 0 && (
      <Select
        value={selectedFileName ?? undefined}
        onValueChange={(newSelectedFile) => {
          const file = Array.from(sourceMapConsumers.keys()).find(
            (key) => key === newSelectedFile
          );
          if (file) {
            setSelectedFileName(file);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select source file" />
        </SelectTrigger>
        <SelectContent>
          {files.map((file) => (
            <SelectItem key={file} value={file}>
              {trimPathExtension(file)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  );
};
