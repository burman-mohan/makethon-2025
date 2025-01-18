"use client";
import { Chat } from "@/components/chat/chat";
import ComboboxDirectory from "@/components/combobox-directory";
import ComboboxFile from "@/components/combobox-file";
import { authContext } from "@/context/authContext";
import React, { useState } from "react";
import { useContext, useEffect } from "react";

type ChatParams = {
  llm: string;
  collection_name: string;
};

type Directory = {
  id: number;
  name: string;
  created_date: string;
};

type File = {
  id: number;
  name: string;
  doc_type: string;
  collection_name: string;
  directory_id: number;
  file_path: string;
  embedding_status: boolean;
  created_at: Date;
  updated_at: Date;
};

type ComboBoxItem = {
  value: string;
  label: string;
};

export default function Page({ llm, collection_name }: ChatParams) {
  const llm_selected: string = llm ?? "llama-3.3-70b-versatile";
  const auth = useContext(authContext);
  const [directories, setDirectories] = React.useState<Directory[]>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const [comboboxListDirectories, setComboboxListDirectories] = useState<
    ComboBoxItem[]
  >([]);
  const [comboboxListFiles, setComboboxListFiles] = useState<ComboBoxItem[]>(
    []
  );
  const [collectionName, setCollectionName] = React.useState(collection_name);

  const fetchDirectories = async (): Promise<Directory[]> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/directories/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: auth.email,
      }),
    });
    const data: Directory[] = await response.json();
    setDirectories(data);
    return data;
  };

  const fetchFiles = async (
    selected_directory: Directory | undefined
  ): Promise<File[]> => {
    if (!selected_directory) {
      return [];
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/file/all/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selected_directory.id,
      }),
    });
    const files: File[] = await response.json();
    setFiles(files);
    return files;
  };

  const [selectedItemDirectory, setSelectedItemDirectory] = useState<
    string | null
  >(null);
  const [selectedItemFile, setSelectedItemFile] = useState<string | null>(null);

  const handleItemSelectedDirectories = (selected: string) => {
    console.log("Back to parent directories: ", selected);

    setSelectedItemDirectory(selected); // Update the parent state with the selected item

    const selected_directory: Directory | undefined = directories.find(
      (item) => item.id.toString() === selected
    );
    console.log("selected_directory: ", directories.length);

    fetchFiles(selected_directory).then((data: File[]) => {
      const comboboxItems: ComboBoxItem[] = [];

      for (const file of data) {
        console.log("label: ", file.name);
        console.log("value: ", file.id);
        const comboboxItem: ComboBoxItem = {
          value: file.id.toString(),
          label: file.name,
        };
        comboboxItems.push(comboboxItem);
      }
      setComboboxListFiles(comboboxItems);
    });
  };

  const handleItemSelectedFiles = (selected: string) => {
    setSelectedItemFile(selected); // Update the parent state with the selected item
    console.log("setSelectedItemFile: ", JSON.stringify(selected));

    const selected_file: File | undefined = files.find(
      (item) => item.id.toString() === selected
    );
    console.log("selected_file: ", selected_file?.collection_name);
    setCollectionName(selected_file?.collection_name || collectionName);
  };

  useEffect(() => {
    fetchDirectories().then((data: Directory[]) => {
      const comboboxItems: ComboBoxItem[] = [];

      for (const directory of data) {
        console.log("label: ", directory.name);
        console.log("value: ", directory.id);
        const comboboxItem: ComboBoxItem = {
          value: directory.id.toString(),
          label: directory.name,
        };
        comboboxItems.push(comboboxItem);
      }
      setComboboxListDirectories(comboboxItems);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex items-start justify-between p-4 bg-gray-100">
        <div className="flex space-x-4">
          {/* <!-- Left-aligned items --> */}
          <ComboboxDirectory
            options={comboboxListDirectories}
            onItemSelected={handleItemSelectedDirectories}
          ></ComboboxDirectory>
          {selectedItemDirectory && (
            <ComboboxFile
              options={comboboxListFiles}
              onItemSelected={handleItemSelectedFiles}
            ></ComboboxFile>
          )}
        </div>
      </div>
      <Chat llm={llm_selected} collection_name={collectionName} />
    </>
  );
}
