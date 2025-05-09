import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { ClearFilesButton } from "@/features/original-position-for/clear-files-button";
import { UploadFiles } from "@/features/original-position-for/upload-files";
import { UploadedFiles } from "@/features/original-position-for/uploaded-files";
import { ErrorStackTextArea } from "@/features/original-position-for/error-stack-textarea";
import { SubmitButton } from "@/features/original-position-for/submit-button";
import { Results } from "@/features/original-position-for/results";
import { MultiAtomsRoot } from "@/features/original-position-for/atoms";

export const metadata: Metadata = {
  title: "Error Stack Parser",
  description: "Upload Source Map files and paste error stack information to quickly locate source code positions. Supports multi-file parsing, one-click location of all error positions.",
  keywords: ["error stack", "stack trace", "error location", "source mapping", "multi-file parsing"],
};

export default function MultiFileParser() {
  return (
    <MultiAtomsRoot>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-semibold text-foreground">
              Upload Source Map Files
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
                Error Stack
              </Label>
              <span className="text-xs text-muted-foreground">(supports multiple lines)</span>
            </div>
            <ErrorStackTextArea />
          </div>
        </Card>

        <SubmitButton>Parse Stack</SubmitButton>

        <Results />
      </div>
    </MultiAtomsRoot>
  );
}
