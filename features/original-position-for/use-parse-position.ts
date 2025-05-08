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
      setError("请选择 sourcemap 文件");
      return;
    }

    const sourceMapConsumer = sourceMapConsumers.get(selectedFileName);
    if (!sourceMapConsumer) {
      setError("请上传 sourcemap 文件并输入行号和列号");
      return;
    }

    if (!generatedLine || !generatedColumn) {
      setError("请输入行号和列号");
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
            source: "未知源文件",
            line: 0,
            column: 0,
            name: `在 ${selectedFileName} 的 ${generatedLine}:${generatedColumn} 位置未找到对应的源文件映射`,
            status: "missing",
          },
        ]);
      }
      setError("");
    } catch (err) {
      setError("解析 sourcemap 时发生错误");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    parsePosition,
  };
};
