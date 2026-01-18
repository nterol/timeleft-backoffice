import { EventList } from "@/data/event-schema";

export const mockEvents: EventList = [
  {
    id: "1",
    type: "dinner",
    date: "2024-01-15T18:00:00Z",
    zone: {
      id: 1,
      name: "Zone A",
      city: {
        id: 1,
        name: "Paris",
        country: { id: 1, name: "France" },
      },
    },
    booked: 50,
    capacity: 100,
    status: "upcoming",
  },
  {
    id: "2",
    type: "drink",
    date: "2024-01-10T20:00:00Z",
    zone: {
      id: 2,
      name: "Zone B",
      city: {
        id: 2,
        name: "Lyon",
        country: { id: 1, name: "France" },
      },
    },
    booked: 80,
    capacity: 100,
    status: "live",
  },
  {
    id: "3",
    type: "run",
    date: "2024-01-05T08:00:00Z",
    zone: {
      id: 3,
      name: "Zone C",
      city: {
        id: 1,
        name: "Paris",
        country: { id: 1, name: "France" },
      },
    },
    booked: 30,
    capacity: 50,
    status: "past",
  },
  {
    id: "4",
    type: "dinner",
    date: "2024-01-20T19:00:00Z",
    zone: {
      id: 4,
      name: "Zone D",
      city: {
        id: 2,
        name: "Lyon",
        country: { id: 1, name: "France" },
      },
    },
    booked: 25,
    capacity: 50,
    status: "upcoming",
  },
  {
    id: "5",
    type: "drink",
    date: "2024-01-12T21:00:00Z",
    zone: {
      id: 5,
      name: "Zone E",
      city: {
        id: 1,
        name: "Paris",
        country: { id: 1, name: "France" },
      },
    },
    booked: 90,
    capacity: 100,
    status: "live",
  },
] as EventList;
