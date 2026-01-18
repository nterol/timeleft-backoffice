import { mockEvents } from "../__tests__/helpers/test-data";

import { getEventList, getEventByID } from "./get-events-data";

// Mock fetch
global.fetch = jest.fn();

describe("getEventList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and parse the event list", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    } as Response);

    const result = await getEventList();

    expect(fetch).toHaveBeenCalledWith(
      "https://cdn.timeleft.com/frontend-tech-test/events.json",
      { cache: "force-cache" }
    );
    expect(result).toEqual(mockEvents);
    expect(result).toHaveLength(5);
  });

  it("should throw error on network failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(getEventList()).rejects.toThrow("Network error");
  });

  it("should throw error on invalid data schema", async () => {
    const invalidData = [
      {
        id: "1",
        type: "invalid-type",
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
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidData,
    } as Response);

    await expect(getEventList()).rejects.toThrow();
  });
});

describe("getEventByID", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return event by ID", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    } as Response);

    const result = await getEventByID("1");

    expect(result).toEqual(mockEvents[0]);
    expect(result.id).toBe("1");
  });

  it("should throw error when event not found", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    } as Response);

    await expect(getEventByID("non-existent-id")).rejects.toThrow(
      "Event with ID non-existent-id not found"
    );
  });

  it("should throw error when event list is empty", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    await expect(getEventByID("1")).rejects.toThrow(
      "Event with ID 1 not found"
    );
  });
});
