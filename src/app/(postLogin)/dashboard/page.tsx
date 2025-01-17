"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { authContext } from "@/context/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DirectoryTable } from "@/components/directory-table";
import { FileIcon } from "@/app/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function DashboardPage() {
  const auth = useContext(authContext);

  console.log("auth value in dashboard: ", auth);

  const [directoryName, setDirectoryName] = useState('');

const createDirectory = async () => {
  try {
    const response = await fetch("http://localhost:8086/api/directories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: directoryName,
        user_email: auth.email,
        embedding_status: false,
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}


  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50">
          <Label>Steps to use:</Label>
          <br></br>
          <Label className="LabelRoot">Create directory</Label>
          <br></br>
          <Label className="LabelRoot">Upload SLA files to directory</Label>
          <br></br>
          <Label className="LabelRoot">Search for insights</Label>
        </div>

        <div className="aspect-video rounded-xl bg-muted/50 flex items-stretch ...">
          <div className="flex w-full max-w-sm items-center  space-x-2">
            <Input 
            type="text" 
            placeholder="Directory Name" 
            onChange={(e) => setDirectoryName(e.target.value)}
            />
            <Button type="submit" onClick={(e)=>{e.preventDefault(); createDirectory();}}>Create Directory</Button>
          </div>
        </div>

        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Directories</TabsTrigger>
              <TabsTrigger value="password">Files</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <DirectoryTable></DirectoryTable>
            </TabsContent>
            <TabsContent value="password">
              <DirectoryTable></DirectoryTable>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
