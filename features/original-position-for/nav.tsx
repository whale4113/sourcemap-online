"use client";

import Link from "next/link";
import { FileText, Files } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <Card className="p-4 shadow-lg border-0 bg-gradient-to-br from-background to-muted/20">
      <div className="flex flex-row lg:flex-col gap-4">
        <Link
          href="/original-position-for/single"
          className={cn(
            "flex-1 lg:flex-none h-12 text-base font-medium flex items-center justify-center rounded-md transition-colors",
            pathname === "/original-position-for/single" &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <FileText className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Single File Parser</span>
          <span className="sm:hidden">Single</span>
        </Link>
        <Link
          href="/original-position-for/multi"
          className={cn(
            "flex-1 lg:flex-none h-12 text-base font-medium flex items-center justify-center rounded-md transition-colors",
            pathname === "/original-position-for/multi" &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Files className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Error Stack Parser</span>
          <span className="sm:hidden">Stack</span>
        </Link>
      </div>
    </Card>
  );
} 