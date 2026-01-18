import { eventListSchema } from "./event-schema";

export async function getEventList() {
  const response = await fetch(
    "https://cdn.timeleft.com/frontend-tech-test/events.json",
    { cache: "force-cache" }
  );
  const data = eventListSchema.parse(await response.json());
  return data;
}

export async function getEventByID(eventID: string) {
  const response = await getEventList();
  const event = response.find((event) => event.id === eventID);
  if (!event) {
    throw new Error(`Event with ID ${eventID} not found`);
  }
  return event;
}