"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import JsonEditReact from "./json-edit-react";


const models = [
  {
    value: "llama-3.3-70b-versatile",
    label: "llama-3.3-70b-versatile",
  },
  {
    value: "mistralai/Mistral-7B-Instruct-v0.3",
    label: "mistralai/Mistral-7B-Instruct-v0.3",
  },
];

export function ShowJson({directory_id}: {directory_id: string}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    console.log("fetching json data");
  }, [value]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Label className="flex flex-col gap-2">JSON Insight</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {value
              ? models.find((model) => model.value === value)?.label
              : "Select model..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {models.map((model) => (
                  <CommandItem
                    key={model.value}
                    value={model.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {model.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === model.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <JsonEditReact model={value} directory_id={directory_id}></JsonEditReact>
    </div>
  );
}
