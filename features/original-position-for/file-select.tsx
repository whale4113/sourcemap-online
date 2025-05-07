"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectedFile, useSourceMapConsumers } from "./atoms";

export const FileSelect = () => {
  const [sourceMapConsumers] = useSourceMapConsumers();
  const [selectedFile, setSelectedFile] = useSelectedFile();

  return (
    sourceMapConsumers.size > 0 && (
      <Select
        value={selectedFile?.file.name || ""}
        onValueChange={(newSelectedFile) => {
          const file = Array.from(sourceMapConsumers.keys()).find(
            (key) => key === newSelectedFile
          );
          if (file) {
            setSelectedFile({
              file: new File([], file),
              type: "sourcemap",
            });
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="选择 sourcemap 文件" />
        </SelectTrigger>
        <SelectContent>
          {Array.from(sourceMapConsumers.keys()).map((file) => (
            <SelectItem key={file} value={file}>
              {file}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  );
};
