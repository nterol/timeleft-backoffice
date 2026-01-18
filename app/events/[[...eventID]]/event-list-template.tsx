import { Suspense } from "react";

import { CardWrapper } from "@/components/atoms/card-wrapper";
import { EventFilters } from "@/components/organisms/event-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { EventList } from "@/data/event-schema";

import { EventContent } from "./event-content";

export function EventListTemplate({ eventData }: { eventData: EventList }) {
  return (
    <section className="col-span-2 flex flex-col gap-4">
      <CardWrapper
        data-testid="events-list-container"
        className="flex flex-col gap-4"
      >
        <section
          data-testid="event-filters"
          className="flex items-baseline gap-3"
        >
          <Suspense
            fallback={
              <>
                <Skeleton className="h-9 w-16 rounded-md" />
                <Skeleton className="h-9 w-16 rounded-md" />
              </>
            }
          >
            <EventFilters data-testid="events-filters" data={eventData} />
          </Suspense>
        </section>
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-md" />}>
          <EventContent eventData={eventData} />
        </Suspense>
      </CardWrapper>
    </section>
  );
}
