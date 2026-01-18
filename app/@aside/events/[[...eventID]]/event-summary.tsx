"use client";
import { Button } from "@/components/ui/button";
import { ItemDescription } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { EventList } from "@/data/event-schema";
import { usePaginateFilteredEvents } from "@/hooks/use-process-events";
import { useAllEventSearchParams } from "@/hooks/use-search-params";

export function EventsSummary({ eventData }: { eventData: EventList }) {
  "use client";
  const { processedEvents } = usePaginateFilteredEvents(eventData);

  const [{ city, type, sort, order }, setAllEventSearchParams] =
    useAllEventSearchParams();

  return (
    <>
      <Separator />
      <ItemDescription>
        {processedEvents.length} event{processedEvents.length > 1 ? "s" : ""}
      </ItemDescription>
      {city || type ? (
        <ItemDescription>
          With filter{city && type ? "s" : ""}{" "}
          {city ? `city : ${city}${type ? " , " : ""}` : ""}{" "}
          {type ? `type : ${type}` : ""}
        </ItemDescription>
      ) : null}
      <ItemDescription>
        {sort && order
          ? `Sorted by ${sort} in ${order === "asc" ? "ascending" : "descending"} order`
          : ""}
      </ItemDescription>
      {city || type || sort || order ? (
        <Button
          variant="link"
          onClick={() =>
            setAllEventSearchParams({
              city: null,
              type: null,
              sort: null,
              order: null,
              page: 1,
            })
          }
        >
          Clear filters
        </Button>
      ) : null}
    </>
  );
}
