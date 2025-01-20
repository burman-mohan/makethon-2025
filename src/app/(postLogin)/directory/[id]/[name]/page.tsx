"use client";


import { FileTable } from "@/components/file-table";
import FileUpload from "@/components/file-upload";
import { ShowJson } from "@/components/show-json";
import { useState } from "react";


export default function Page({
  params,
}: {
  params: { name: string, id: string };
}) {

  const [file_id, setFileId] = useState('')



  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-muted/50">
          <FileUpload directoryName={params.name} directoryId={params.id}></FileUpload>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50">
          <FileTable directory_id={params.id} setFileId={setFileId}></FileTable>
          </div>
        </div>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <ShowJson directory_id={params.id} file_id={file_id}></ShowJson>
        </div>
      </div>
    </>
  );
}
