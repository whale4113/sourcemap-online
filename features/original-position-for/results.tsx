"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useError, useResults } from "./atoms";

const highlightFunctionName = (
  line: string,
  functionName?: string,
  column?: number
) => {
  if (!functionName || !column) return line;

  return (
    <>
      {line.slice(0, column)}
      <span className="text-yellow-500 font-semibold">{functionName}</span>
      {line.slice(column + functionName.length)}
    </>
  );
};

export const Results = () => {
  const [error] = useError();
  const [results] = useResults();

  return (
    <>
      {error && (
        <div className="flex items-start gap-3 p-4 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div className="text-sm whitespace-pre-wrap">{error}</div>
        </div>
      )}

      {results.length > 0 && (
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold">解析结果</h3>
            <span className="text-sm text-muted-foreground">
              ({results.length} 个位置)
            </span>
          </div>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.status === "missing"
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-muted/30 border-muted-foreground/10"
                }`}
              >
                <div className="w-full flex items-start gap-3">
                  {result.status === "missing" ? (
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  )}
                  <div className="space-y-1.5 flex-1 overflow-x-auto">
                    <p className="font-medium whitespace-pre-wrap break-all">
                      {result.source}
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {result.error ? (
                        <p className="col-span-2 text-destructive">{result.error}</p>
                      ) : (
                        <>
                          <p>行号：{result.line}</p>
                          <p>列号：{result.column}</p>
                          {result.name && (
                            <p className="col-span-2">函数：{result.name}</p>
                          )}
                        </>
                      )}
                    </div>
                    {result.sourceContent && (
                      <div className="mt-4">
                        <div className="text-sm text-muted-foreground mb-2">
                          源码内容：
                        </div>
                        <div className="relative">
                          <pre className="p-3 bg-muted/50 rounded-md text-sm font-mono overflow-x-auto">
                            {result.sourceContent.content
                              .split("\n")
                              .map((line, i) => (
                                <div
                                  key={i}
                                  className={`w-max whitespace-nowrap ${
                                    i ===
                                    result.sourceContent!.highlightLine - 1
                                      ? "bg-primary/10"
                                      : ""
                                  }`}
                                >
                                  <span className="text-muted-foreground mr-4 select-none inline-block min-w-[3ch]">
                                    {result.sourceContent!.startLine + i}
                                  </span>
                                  <span className="inline-block">
                                    {i ===
                                    result.sourceContent!.highlightLine - 1
                                      ? highlightFunctionName(
                                          line,
                                          result.name,
                                          result.column
                                        )
                                      : line}
                                  </span>
                                </div>
                              ))}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};
