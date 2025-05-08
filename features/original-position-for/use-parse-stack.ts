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
      setError("请输入错误堆栈信息");
      return;
    }

    if (sourceMapConsumers.size === 0) {
      setError("请上传 sourcemap 文件");
      return;
    }

    setLoading(true);
    try {
      const lines = errorStack.split("\n");
      const results: ParsedResult[] = [];

      for (const line of lines) {
        // 使用正则表达式的 exec 方法进行多次匹配
        const regex =
          /(?:at\s+(?:\w+\.)?(?:\w+)\s+)?(?:\(?)([^:]+):(\d+):(\d+)(?:\)?)/g;
        let match;

        while ((match = regex.exec(line)) !== null) {
          const [, file, line, column] = match;

          // 尝试找到匹配的 consumer
          const matchedConsumers: SourceMapConsumer[] = [];
          const stackFileName = getPureFileName(file);

          for (const [
            sourceMapName,
            consumer,
          ] of sourceMapConsumers.entries()) {
            // 直接比较 sourcemap 文件名和堆栈文件名
            if (
              getPureFileName(getPureFileName(sourceMapName)) === stackFileName
            ) {
              matchedConsumers.push(consumer);
            }
          }

          // 如果找不到匹配的 consumer，添加未找到的结果
          if (matchedConsumers.length === 0) {
            results.push({
              source: "未知源文件",
              line: 0,
              column: 0,
              name: `未找到 ${file} 对应的 sourcemap 文件，无法解析 ${line}:${column} 位置`,
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
          }
        }
      }

      setResults(results);
      setError("");
    } catch (err) {
      setError("解析堆栈时发生错误");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { parseStack };
};
