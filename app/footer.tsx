import Link from "next/link";

import { Logo } from "@/assets/icons/logo";

export function Footer() {
  return (
    <footer className="col-span-full row-span-1 flex items-center justify-end-safe gap-2 p-4">
      <p className="text-xs font-bold">2026</p>
      <Link href="https://timeleft.com/">
        <Logo className="w-12" />
      </Link>

      <Link href="https://github.com/nterol" className="text-xs">
        @nterol
      </Link>
    </footer>
  );
}
