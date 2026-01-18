import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getEventList } from "@/data/get-events-data";

import { EventsSummary } from "./event-summary";

export default async function AsideEventsPage() {
  const eventData = await getEventList();
  return (
    <>
      <Suspense fallback={<Skeleton className="h-9 w-16 rounded-md" />}>
        <EventsSummary eventData={eventData} />
      </Suspense>
    </>
  );
}
