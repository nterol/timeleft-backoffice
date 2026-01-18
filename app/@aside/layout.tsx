import { HomeIcon, ListIcon } from "lucide-react";
import Link from "next/link";

import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function AsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="col-span-1 h-fit rounded-lg border border-b-neutral-900 bg-neutral-900/50 p-4">
      <ItemGroup>
        <Item asChild>
          <Link href="/">
            <ItemTitle>
              <ItemMedia>
                <HomeIcon size={16} />
              </ItemMedia>
              Home
            </ItemTitle>
          </Link>
        </Item>

        <Item asChild>
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
        </Item>
      </ItemGroup>
    </aside>
  );
}
