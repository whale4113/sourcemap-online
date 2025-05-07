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

          // 如果找不到匹配的 consumer，使用第一个可用的
          const consumer =
            matchedConsumers.length > 0
              ? matchedConsumers[0] // 暂时使用第一个匹配的 consumer
              : Array.from(sourceMapConsumers.values())[0];

          if (!consumer) {
            continue;
          }

          const originalPosition = consumer.originalPositionFor({
            line: parseInt(line),
            column: parseInt(column),
          });

          if (originalPosition && originalPosition.source) {
            results.push({
              source: originalPosition.source,
              line: originalPosition.line || 0,
              column: originalPosition.column || 0,
              name: originalPosition.name,
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
