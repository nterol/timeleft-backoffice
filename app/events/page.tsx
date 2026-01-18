import { CardWrapper } from "@/components/atoms/card-wrapper";
import { EventFilters } from "@/components/organisms/event-filters";
import { getEventList } from "@/data/get-events-data";
import { EventContent } from "./event-content";

export default async function EventListPage() {
    const eventData = await getEventList();
    return (
        <section className="col-span-2 flex flex-col gap-4">
            <CardWrapper data-testid="events-list-container" className="flex flex-col gap-4">
                <EventFilters data-testid="events-filters" data={eventData} />
                <EventContent eventData={eventData} />
            </CardWrapper>
        </section>
    );
}
