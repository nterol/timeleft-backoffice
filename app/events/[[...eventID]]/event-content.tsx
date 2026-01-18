"use client";
import { lazy, Suspense } from "react";

import { EventTable } from "@/components/molecules/event-table";
import { PaginationPlaceholder } from "@/components/molecules/placeholder";
import { EventList } from "@/data/event-schema";
import { usePaginateFilteredEvents } from "@/hooks/use-process-events";

const CustomPagination = lazy(() => import("@/components/molecules/custom-pagination").then(mod => ({ default: mod.CustomPagination })))

export function EventContent({ eventData }: { eventData: EventList }) {

    const { paginatedEvents, totalPages } = usePaginateFilteredEvents(eventData);
    return <>
        <EventTable data={paginatedEvents} />
        <Suspense fallback={<PaginationPlaceholder />}>
            {totalPages > 1 ? <CustomPagination totalPages={totalPages} /> : null}
        </Suspense>
    </>
}