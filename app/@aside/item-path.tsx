"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { Item } from "@/components/ui/item";

export function ItemPath({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Item asChild variant={pathname === path ? "muted" : "default"}>
      {children}
    </Item>
  );
}
