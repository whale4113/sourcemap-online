import { trimPathExtension } from "@/lib/utils";
import {
  useError,
  useLoading,
  useResults,
  useSourceMapConsumers,
  useGeneratedColumn,
  useGeneratedLine,
  useSelectedFileName,
} from "./atoms";
import { SourceMapConsumer } from "source-map-js";

const getSourceContent = (
  consumer: SourceMapConsumer,
  source: string,
  line: number,
  contextLines: number = 4
) => {
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

export const useParsePosition = () => {
  const [, setLoading] = useLoading();
  const [, setError] = useError();
  const [sourceMapConsumers] = useSourceMapConsumers();
  const [, setResults] = useResults();

  const [selectedFileName] = useSelectedFileName();
  const [generatedLine] = useGeneratedLine();
  const [generatedColumn] = useGeneratedColumn();

  const parsePosition = async () => {
    if (!selectedFileName) {
      setError("Please select a source map file");
      return;
    }

    const sourceMapConsumer = sourceMapConsumers.get(selectedFileName);
    if (!sourceMapConsumer) {
      setError(
        "Please upload a source map file and input line and column numbers"
      );
      return;
    }

    if (!generatedLine || !generatedColumn) {
      setError("Please input line and column numbers");
      return;
    }

    setLoading(true);
    try {
      const originalPosition = sourceMapConsumer.originalPositionFor({
        line: generatedLine,
        column: generatedColumn,
      });

      if (originalPosition && originalPosition.source) {
        const sourceContent = getSourceContent(
          sourceMapConsumer,
          originalPosition.source,
          originalPosition.line || 0
        );

        setResults([
          {
            source: originalPosition.source,
            line: originalPosition.line || 0,
            column: originalPosition.column || 0,
            name: originalPosition.name,
            status: "success",
            sourceContent,
          },
        ]);
      } else {
        setResults([
          {
            source: trimPathExtension(selectedFileName),
            line: 0,
            column: 0,
            error: `No source file mapping found at position ${generatedLine}:${generatedColumn} in ${trimPathExtension(
              selectedFileName
            )})}`,
            status: "missing",
          },
        ]);
      }
      setError("");
    } catch (err) {
      setError("Error parsing source map");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    parsePosition,
  };
};
