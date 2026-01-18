import { getEventList } from "@/data/get-events-data";

import { EventListTemplate } from "./event-list-template";

export default async function EventListPage() {
    const eventData = await getEventList();
    return (
        <EventListTemplate eventData={eventData} />
    );
}
