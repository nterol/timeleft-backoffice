import { CardWrapper } from "@/components/atoms/card-wrapper";
import { EventFilters } from "@/components/organisms/event-filters";
import { EventTable } from "@/components/organisms/event-table";
import { getEventList } from "@/data/get-events-data";

export default async function EventListPage() {
    const eventData = await getEventList();
    return (
        <section className="col-span-2 flex flex-col gap-4">
            <CardWrapper className="flex flex-col gap-4">
                <EventFilters data={eventData} />
                <EventTable data={eventData} />
            </CardWrapper>
        </section>
    );
}
