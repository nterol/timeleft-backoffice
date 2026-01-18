import Link from "next/link";

import { Logo } from "@/assets/icons/logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="col-span-full row-span-1 justify-end-safe flex items-baseline p-2 gap-2">
      <p className="text-xs font-bold">2026</p>
      <Button variant="link" asChild size="sm">
        <Link href="https://github.com/nterol" className="text-xs">
          @nterol
        </Link>
      </Button>
      <Logo className="w-12" />
    </footer>
  );
}
