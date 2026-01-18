import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="col-span-2">
      <Button variant="link">
        <Link href="/events">Go to event page</Link>
      </Button>
    </section>
  );
}
