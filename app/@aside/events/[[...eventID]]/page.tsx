import { getEventList } from "@/data/get-events-data";

export default async function AsideEventsPage() {
  const eventData = await getEventList();
  return (
    <section className="flex flex-col gap-4">
      <h2>Events</h2>
      <p>{eventData.length} events</p>
    </section>
  );
}
