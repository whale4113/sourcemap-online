"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useError, useResults } from "./atoms";

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
                className="p-4 bg-muted/30 rounded-lg border border-muted-foreground/10"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1.5">
                    <p className="font-medium">{result.source}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <p>行号：{result.line}</p>
                      <p>列号：{result.column}</p>
                      {result.name && (
                        <p className="col-span-2">函数：{result.name}</p>
                      )}
                    </div>
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
