"use client";

import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { SourceMapConsumer } from "source-map-js";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import {
  FileUpload,
  useFiles,
  useError,
  useResults,
  useSourceMapConsumers,
} from "./atoms";
import { readFileAsText, State, withStateLock } from "@/lib/utils";

export const UploadFiles = () => {
  const [files, setFiles] = useFiles();
  const [, setError] = useError();
  const [, setResults] = useResults();
  const [, setSourceMapConsumers] = useSourceMapConsumers();

  const stateRef = useRef(State.Idle);
  const onDrop = useCallback(
    withStateLock(stateRef, async (acceptedFiles: File[]) => {
      const existingFileNames = new Set(files.map((f) => f.file.name));

      const newFiles: FileUpload[] = acceptedFiles
        .filter((f) => !existingFileNames.has(f.name))
        .map((file) => ({
          file,
          type: "sourcemap" as const,
        }));

      if (newFiles.length === 0) {
        return;
      }

      setResults([]);
      setError("");

      for (const newFile of newFiles) {
        try {
          const fileContent = await readFileAsText(newFile.file);
          const sourceMapData = JSON.parse(fileContent);
          const consumer = new SourceMapConsumer(sourceMapData);
          setSourceMapConsumers((prev) =>
            new Map(prev).set(newFile.file.name, consumer)
          );
        } catch (error) {
          console.error(error);
          toast(`\n解析 ${newFile.file.name} 失败`);
          continue;
        }

        setFiles((prev) => {
          return [...prev, newFile];
        });
      }
    }),
    [files, setError, setFiles, setResults, setSourceMapConsumers]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".map"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-colors duration-200 ease-in-out
            ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/20"
            }
          `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <Upload className="h-8 w-8 text-muted-foreground" />
        {isDragActive ? (
          <p className="text-primary font-medium">将文件拖放到这里...</p>
        ) : (
          <div className="space-y-1">
            <p className="font-medium">拖放文件到这里，或点击选择文件</p>
            <p className="text-sm text-muted-foreground">单个文件最大 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};
