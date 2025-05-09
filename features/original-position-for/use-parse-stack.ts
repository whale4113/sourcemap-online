import {
  ParsedResult,
  useError,
  useLoading,
  useResults,
  useSourceMapConsumers,
  useErrorStack,
} from "./atoms";
import { getPureFileName } from "@/lib/utils";
import { SourceMapConsumer } from "source-map-js";

const getSourceContent = (
  consumer: SourceMapConsumer,
  source: string,
  line: number,
  contextLines: number = 4
): ParsedResult["sourceContent"] => {
  const content = consumer.sourceContentFor(source);
  if (!content) return undefined;

  const lines = content.split("\n");
  const startLine = Math.max(0, line - contextLines - 1);
  const endLine = Math.min(lines.length, line + contextLines);
  const highlightLine = line - startLine;

  return {
    content: lines.slice(startLine, endLine).join("\n"),
    startLine: startLine + 1,
    endLine,
    highlightLine,
  };
};

export const useParseStack = () => {
  const [, setLoading] = useLoading();
  const [, setError] = useError();
  const [errorStack] = useErrorStack();
  const [sourceMapConsumers] = useSourceMapConsumers();
  const [, setResults] = useResults();

  const parseStack = async () => {
    if (!errorStack.trim()) {
      setError("Please input error stack information");
      return;
    }

    if (sourceMapConsumers.size === 0) {
      setError("Please upload source map files");
      return;
    }

    setLoading(true);
    try {
      const lines = errorStack.split("\n");
      const results: ParsedResult[] = [];

      for (const line of lines) {
        const regex =
          /(?:at\s+(?:\w+\.)?(?:\w+)\s+)?(?:\(?)([^:]+):(\d+):(\d+)(?:\)?)/g;
        let match;

        while ((match = regex.exec(line)) !== null) {
          const [, file, line, column] = match;

          const matchedConsumers: SourceMapConsumer[] = [];
          const stackFileName = getPureFileName(file);

          for (const [
            sourceMapName,
            consumer,
          ] of sourceMapConsumers.entries()) {
            if (
              getPureFileName(getPureFileName(sourceMapName)) === stackFileName
            ) {
              matchedConsumers.push(consumer);
            }
          }

          if (matchedConsumers.length === 0) {
            results.push({
              source: file,
              line: 0,
              column: 0,
              error: `No source map file found for ${file}, cannot parse position ${line}:${column}`,
              status: "missing",
            });
            continue;
          }

          const consumer = matchedConsumers[0];
          const originalPosition = consumer.originalPositionFor({
            line: parseInt(line),
            column: parseInt(column),
          });

          if (originalPosition && originalPosition.source) {
            const sourceContent = getSourceContent(
              consumer,
              originalPosition.source,
              originalPosition.line || 0
            );

            results.push({
              source: originalPosition.source,
              line: originalPosition.line || 0,
              column: originalPosition.column || 0,
              name: originalPosition.name,
              status: "success",
              sourceContent,
            });
          } else {
            results.push({
              source: file,
              line: 0,
              column: 0,
              error: `No source file mapping found at position ${line}:${column} in ${file}`,
              status: "missing",
            });
          }
        }
      }

      setResults(results);
      setError("");
    } catch (err) {
      setError("Error parsing stack trace");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { parseStack };
};
