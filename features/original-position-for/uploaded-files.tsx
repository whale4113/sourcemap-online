"use client";

import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFiles } from "./atoms";

export const UploadedFiles = () => {
  const [files, setFiles] = useFiles();

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    files.length > 0 && (
      <div className="mt-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          已上传文件
        </h3>
        <div className="space-y-2">
          {files.map((fileUpload, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {fileUpload.file.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};
