import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Single File Parser",
  description: "Upload Source Map file and input line and column numbers to quickly locate source code positions. Supports source code preview for context viewing.",
  keywords: ["single file parsing", "source mapping", "line column", "source preview", "source location"],
};

export default function SingleFileParser() {
  return (
    <SingleAtomsRoot>
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
          <FileSelect />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="line" className="text-base block mb-2">
                Line
              </Label>
              <LineInput />
            </div>
            <div>
              <Label htmlFor="column" className="text-base block mb-2">
                Column
              </Label>
              <ColumnInput />
            </div>
          </div>
        </Card>

        <SubmitButton>Parse Position</SubmitButton>

        <Results />
      </div>
    </SingleAtomsRoot>
  );
}
