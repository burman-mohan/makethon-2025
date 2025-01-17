import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authContext } from "@/context/authContext";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

type Directory = {
  id: string;
  name: string;
  created_date: string;
};


export function DirectoryTable() {
  const [directories, setDirectories] = React.useState<Directory[]>([]);
  const auth = useContext(authContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDirectories = async (): Promise<Directory[]> => {
    const response = await fetch("http://localhost:8086/api/directories/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: auth.email,
      }),
    });

    const data: Directory[] = await response.json();
    return data;
  };



  useEffect(() => {
    fetchDirectories().then(setDirectories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table className="w-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>File Count</TableHead>
          <TableHead>Created At</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {directories.length> 0 && directories.map((directory) => (
          <TableRow key={directory.name}>
            <TableCell className="font-medium">
            <Link href={`/directory/${encodeURIComponent(directory.id)}/${encodeURIComponent(directory.name)}`}>{directory.name}</Link>
            </TableCell>
            <TableCell>3</TableCell>
            <TableCell>{directory.created_date}</TableCell>
            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
}
