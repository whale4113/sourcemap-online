import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { ClearFilesButton } from "@/features/original-position-for/clear-files-button";
import { UploadFiles } from "@/features/original-position-for/upload-files";
import { UploadedFiles } from "@/features/original-position-for/uploaded-files";
import { ErrorStackTextArea } from "@/features/original-position-for/error-stack-textarea";
import { SubmitButton } from "@/features/original-position-for/submit-button";
import { Results } from "@/features/original-position-for/results";
import { MultiAtomsRoot } from "@/features/original-position-for/atoms";

export default function MultiFileParser() {
  return (
    <MultiAtomsRoot>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-semibold text-foreground">
              上传 source map 文件
            </h3>
            <ClearFilesButton />
          </div>
          <UploadFiles />
          <UploadedFiles />
        </Card>

        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="error-stack" className="text-base">
                错误堆栈
              </Label>
              <span className="text-xs text-muted-foreground">(支持多行)</span>
            </div>
            <ErrorStackTextArea />
          </div>
        </Card>

        <SubmitButton>解析堆栈</SubmitButton>

        <Results />
      </div>
    </MultiAtomsRoot>
  );
}
