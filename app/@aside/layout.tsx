import { HomeIcon, ListIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

import { ItemPath } from "./item-path";

export default async function AsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="col-span-1 h-fit rounded-lg border border-b-neutral-900 bg-neutral-900/50 p-4">
      <ItemGroup className="flex flex-col gap-4">
        <Suspense fallback={<Skeleton className="h-12 w-full rounded-md" />}>
          <ItemPath path="/">
            <Link href="/">
              <ItemTitle>
                <ItemMedia>
                  <HomeIcon size={16} />
                </ItemMedia>
                Home
              </ItemTitle>
            </Link>
          </ItemPath>
        </Suspense>

        <Suspense fallback={<Skeleton className="h-12 w-full rounded-md" />}>
          <ItemPath path="/events">
            <Link href="/events">
              <ItemContent>
                <ItemTitle>
                  <ItemMedia>
                    <ListIcon size={16} />
                  </ItemMedia>
                  Events
                </ItemTitle>
                {children}
              </ItemContent>
            </Link>
          </ItemPath>
        </Suspense>
      </ItemGroup>
    </aside>
  );
}
