import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SortKey, useSortParams } from "@/hooks/use-search-params";

export function SortableHeader({
  sortKey,
  children,
}: {
  children: React.ReactNode;
  sortKey: string;
}) {
  const [{ sort, order }, setSortParams] = useSortParams();

  return (
    <Button
      variant="ghost"
      onClick={() =>
        setSortParams(
          order === "desc"
            ? { sort: "", order: "" }
            : {
                sort: sortKey as SortKey,
                order: order === "asc" ? "desc" : "asc",
              }
        )
      }
    >
      {children}
      {!sortKey || sort !== sortKey ? (
        <ArrowUpDownIcon className="h-4 w-4" />
      ) : order === "asc" ? (
        <ArrowUpIcon className="h-4 w-4" />
      ) : (
        <ArrowDownIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
