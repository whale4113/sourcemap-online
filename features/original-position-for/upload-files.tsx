"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { SourceMapConsumer } from "source-map-js";
import { Upload } from "lucide-react";
import {
  FileUpload,
  useFiles,
  useError,
  useResults,
  useSourceMapConsumers,
} from "./atoms";

export const UploadFiles = () => {
  const [, setFiles] = useFiles();
  const [, setError] = useError();
  const [, setResults] = useResults();

  const [, setSourceMapConsumers] = useSourceMapConsumers();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: FileUpload[] = acceptedFiles.map((file) => ({
        file,
        type: file.name.endsWith(".map")
          ? ("sourcemap" as const)
          : ("source" as const),
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      setResults([]);
      setError("");

      // 处理 sourcemap 文件
      const sourceMapFiles = newFiles.filter((f) => f.type === "sourcemap");
      sourceMapFiles.forEach((fileUpload) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (event.target?.result) {
            try {
              const sourceMapData = JSON.parse(event.target.result as string);
              const consumer = await new SourceMapConsumer(sourceMapData);
              setSourceMapConsumers((prev) =>
                new Map(prev).set(fileUpload.file.name, consumer)
              );
            } catch (err) {
              console.error("解析 sourcemap 文件失败:", err);
              setError((prev) => prev + `\n解析 ${fileUpload.file.name} 失败`);
            }
          }
        };
        reader.onerror = () => {
          setError((prev) => prev + `\n读取 ${fileUpload.file.name} 失败`);
        };
        reader.readAsText(fileUpload.file);
      });
    },
    [setError, setFiles, setResults, setSourceMapConsumers]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".map"],
      "text/javascript": [".js"],
      "text/plain": [".txt"],
      "application/zip": [".zip"],
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
            <p className="text-sm text-muted-foreground">
              支持源文件和 sourcemap 文件
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
