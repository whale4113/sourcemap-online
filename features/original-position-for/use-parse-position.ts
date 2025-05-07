import {
  useError,
  useLoading,
  useResults,
  useSourceMapConsumers,
  useGeneratedColumn,
  useGeneratedLine,
  useSelectedFile,
} from "./atoms";

export const useParsePosition = () => {
  const [, setLoading] = useLoading();
  const [, setError] = useError();
  const [sourceMapConsumers] = useSourceMapConsumers();
  const [, setResults] = useResults();

  const [selectedFile] = useSelectedFile();
  const [generatedLine] = useGeneratedLine();
  const [generatedColumn] = useGeneratedColumn();

  const parsePosition = async () => {
    if (!selectedFile) {
      setError("请选择 sourcemap 文件");
      return;
    }

    const sourceMapConsumer = sourceMapConsumers.get(selectedFile.file.name);
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
        setResults([
          {
            source: originalPosition.source,
            line: originalPosition.line || 0,
            column: originalPosition.column || 0,
            name: originalPosition.name,
          },
        ]);
        setError("");
      } else {
        setError("未找到对应的源文件位置");
      }
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
