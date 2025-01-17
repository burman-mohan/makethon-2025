/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  directoryName: string;
  directoryId: string;
}

export default function FileUpload({
  directoryName,
  directoryId,
}: FileUploadProps) {
  const { toast } = useToast();
  const [fileData, setFileData] = useState<[]>([]);
  const fileUpload: any = useRef<HTMLFormElement>(null);
  const [fileUploadStatus, setFileUploadStatus] = useState<any | null>(null);

  const handleFileUploadChange = (data: any) => {
    if (data.target.files) {
      if (data.target.files.length > 0) {
        let fileData: any = [];
        for (let index = 0; index < data.target.files.length; index++) {
          fileData.push({
            name: data.target.files[index].name,
            size: data.target.files[index].size,
          });
        }
        setFileData(fileData);
      }
    }
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    fileData.map((item: any, index: any) => {
      formData.append(
        "files",
        fileUpload.current.files[index],
        fileUpload.current.files[index].name
      );
    });
    formData.append("directoryId", directoryId);
    formData.append("directoryName", directoryName);
    const response = await fetch("http://localhost:8086/api/file/files", {
      method: "POST",
      body: formData,
    });
    const resultData = await response.json();
    console.log("resultData", resultData);
    if (resultData) {
      setFileUploadStatus(resultData.status);
    }
  };

  useEffect(() => {
    console.log("fileUploadStatus", fileUploadStatus);
    if (fileUploadStatus) {
      console.log("fileUploadStatus1", fileUploadStatus);
      toast({
        title: "File uploaded successfully",
      });
    }
  }, [fileUploadStatus, toast]);

  return (
    <Card>
      <CardHeader>{directoryName}</CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2 text-sm">
          <Input
            id="file"
            type="file"
            placeholder="File"
            accept=".docx, .pdf"
            onChange={handleFileUploadChange}
            ref={fileUpload}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" onClick={handleFileUpload}>
          Upload
        </Button>
      </CardFooter>
    </Card>


  );
}
