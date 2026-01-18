"use client";
import { Button } from "@/components/ui/button";

import { parseAsInteger, useQueryState } from "nuqs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function DropdownFilter({
  label,
  name,
  values,
}: {
  label?: string;
  name: string;
  values: string[] | { value: string | number; label: string }[];
}) {
  const [searchParams, setSearchParams] = useQueryState(name);
  const [, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const formatedValues = values.map((value) => {
    if (typeof value === "string") return { value, label: value };
    return value;
  });

  console.log(name, formatedValues, { searchParams });

  const labelDisplay = searchParams
    ? formatedValues.find(
        ({ value }) => value.toString() === searchParams.toString()
      )?.label
    : (label ?? name);

  console.log(labelDisplay);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="capitalize" variant="outline">
          {labelDisplay}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {formatedValues.map(({ value, label }) => {
          return (
            <DropdownMenuCheckboxItem
              key={value}
              className="capitalize"
              onCheckedChange={async () => {
                await setSearchParams(
                  searchParams !== value ? value.toString() : null
                );
                // Reset page search params on new filters
                setCurrentPage(1);
              }}
              checked={searchParams === value}
            >
              {label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
