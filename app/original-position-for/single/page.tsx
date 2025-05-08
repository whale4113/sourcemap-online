import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { SingleAtomsRoot } from "@/features/original-position-for/atoms";
import { UploadedFiles } from "@/features/original-position-for/uploaded-files";
import { LineInput } from "@/features/original-position-for/line-input";
import { ColumnInput } from "@/features/original-position-for/column-input";
import { UploadFiles } from "@/features/original-position-for/upload-files";
import { ClearFilesButton } from "@/features/original-position-for/clear-files-button";
import { Results } from "@/features/original-position-for/results";
import { SubmitButton } from "@/features/original-position-for/submit-button";
import { FileSelect } from "@/features/original-position-for/file-select";

export default function SingleFileParser() {
  return (
    <SingleAtomsRoot>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                文件上传
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                支持 .js、.map 文件，单个文件最大 10MB
              </p>
            </div>
            <ClearFilesButton />
          </div>
          <UploadFiles />
          <UploadedFiles />
        </Card>

        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <FileSelect />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="line" className="text-base">
                行号
              </Label>
              <LineInput />
            </div>
            <div className="space-y-2">
              <Label htmlFor="column" className="text-base">
                列号
              </Label>
              <ColumnInput />
            </div>
          </div>
        </Card>

        <SubmitButton>解析位置</SubmitButton>

        <Results />
      </div>
    </SingleAtomsRoot>
  );
}
