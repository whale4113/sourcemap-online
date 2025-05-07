import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { ClearFilesButton } from "../client/components/clear-files-button";
import { UploadFiles } from "../client/components/upload-files";
import { UploadedFiles } from "../client/components/uploaded-files";
import { ErrorStackTextArea } from "./client/components/error-stack-textarea";
import { SubmitButton } from "../client/components/submit-button";
import { Results } from "../client/components/results";
import { AtomsRoot } from "./client/atoms";

export default function MultiFileParser() {
  return (
    <AtomsRoot>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                文件上传
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                支持 .js、.map、.txt 和 .zip 文件，单个文件最大 10MB
              </p>
            </div>
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
    </AtomsRoot>
  );
}
