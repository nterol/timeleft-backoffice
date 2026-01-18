import { ModalDialog } from "@/components/molecules/modal-dialog";
import { getEventByID, getEventList } from "@/data/get-events-data";

import { EventDetailContent } from "./event-detail-content";

export async function generateStaticParams() {
  const eventData = await getEventList();
  return eventData.map(event => ({
    eventID: [event.id],
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: { eventID?: string };
}) {
  const { eventID } = await params;
  if (!eventID) return null;
  const event = await getEventByID(eventID[0]);
  return (
    <ModalDialog testId={`event-detail-dialog-${eventID}`}>
      <EventDetailContent event={event} />
    </ModalDialog>
  );
}
