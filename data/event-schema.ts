import { z } from "zod";

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.object({ id: z.number(), name: z.string() }),
});

export const zoneSchema = z.object({
  id: z.number(),
  name: z.string(),
  city: citySchema,
});

export const eventTypeSchema = z.enum(["dinner", "drink", "run"]);
export const eventStatusSchema = z.enum(["upcoming", "live", "past"]);

export type EventType = z.infer<typeof eventTypeSchema>;
export type EventStatus = z.infer<typeof eventStatusSchema>;
export const eventSchema = z.object({
  id: z.string(),
  type: eventTypeSchema,
  date: z.string(),
  zone: zoneSchema,
  booked: z.number(),
  capacity: z.number(),
  status: eventStatusSchema,
});

export type Event = z.infer<typeof eventSchema>;

export const eventListSchema = z.array(eventSchema);

export type EventList = z.infer<typeof eventListSchema>;
