"use client";
import { FileTable } from "@/components/file-table";

export default function DirectoryPage() {

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-muted/50"></div>
          <div className="aspect-video rounded-xl bg-muted/50"></div>
        </div>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="flex flex-1 flex-col gap-4 p-4">
            <FileTable></FileTable>
        </div>
      </div>
    </div>
  );
}
