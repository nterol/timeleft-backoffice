import { Skeleton } from "../ui/skeleton";

export const PaginationPlaceholder = () => (
  <div className="flex gap-4">
    <Skeleton className="aspect-square w-9 rounded-sm" />
    <Skeleton className="aspect-square w-9 rounded-sm" />
    <Skeleton className="aspect-square w-9 rounded-sm" />
  </div>
);
