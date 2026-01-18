
import { Logo } from "@/assets/icons/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="col-span-full row-span-1 flex flex-row-reverse p-2 gap-2">
      <Button variant="link" asChild size="sm">
        <Link href="https://github.com/nterol" className="text-xs">
          @nterol
        </Link>
      </Button>
      <Logo className="w-12" />
    </footer>
  );
}
