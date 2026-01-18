import { eventListSchema } from "./event-schema";

export async function getEventList() {
  const response = await fetch(
    "https://cdn.timeleft.com/frontend-tech-test/events.json",
    { cache: "force-cache" }
  );
  const data = eventListSchema.parse(await response.json());
  return data;
}
