"use client";

import { XIcon } from "lucide-react";

import { PercentageText } from "@/components/atoms/percentage-text";
import { StatusBadge } from "@/components/molecules/status-badge";
import { Button } from "@/components/ui/button";
import { ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { getEventByID } from "@/data/get-events-data";

interface EventDetailContentProps {
  event: Awaited<ReturnType<typeof getEventByID>>;
}

export function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <header className="grid grid-cols-[1fr_auto] justify-end text-white">
        <h2 className="col-span-2 col-start-1 row-start-1 text-2xl font-bold text-white">
          <span className="capitalize">{event.type}</span>@{event.zone.name} - (
          {event.zone.city.name})
        </h2>
        <form method="dialog" className="col-start-2 row-start-1">
          <Button variant="ghost">
            <XIcon className="size-4" />
          </Button>
        </form>
        <p className="col-span-2 row-start-2 text-xs text-gray-50">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
      </header>
      <main className="flex flex-col text-white">
        <div className="flex flex-col gap-2">
          <ItemContent className="text-white">
            <ItemTitle className="text-lg font-bold">Event Details</ItemTitle>
            <ItemDescription className="text-white">
              This event is <StatusBadge size="md" status={event.status} />
            </ItemDescription>
            <ItemDescription className="text-white">
              This event is a {event.type} event that{" "}
              {event.status === "live"
                ? "is"
                : event.status === "upcoming"
                  ? "will be"
                  : "was"}{" "}
              held at {event.zone.name} - ({event.zone.city.name}) on{" "}
              {new Date(event.date).toLocaleDateString()}.
            </ItemDescription>
            <ItemDescription className="text-white">
              Capacity: {event.capacity}
            </ItemDescription>
            <ItemDescription className="text-white">
              Booked: {event.booked}
            </ItemDescription>

            <ItemDescription className="text-white">
              The event is{" "}
              <PercentageText current={event.booked} total={event.capacity} />
            </ItemDescription>
          </ItemContent>
        </div>
      </main>
    </div>
  );
}
