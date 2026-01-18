import { Skeleton } from "../ui/skeleton";

export const PaginationPlaceholder = () => <div className="flex gap-4">
    <Skeleton className="w-9 aspect-square rounded-sm" />
    <Skeleton className="w-9 aspect-square rounded-sm" />
    <Skeleton className="w-9 aspect-square rounded-sm" />
</div>