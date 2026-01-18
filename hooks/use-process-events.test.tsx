import { renderHook } from "@testing-library/react";
import * as nuqs from "nuqs";

import { mockEvents } from "../__tests__/helpers/test-data";

import {
  useFilterEvents,
  useSortFilteredEvents,
  usePaginateFilteredEvents,
} from "./use-process-events";
import * as searchParams from "./use-search-params";

// Mock nuqs
jest.mock("nuqs", () => ({
  useQueryState: jest.fn(),
  parseAsInteger: {
    withDefault: (defaultValue: number) => ({
      parse: (value: string | null) =>
        value ? parseInt(value, 10) : defaultValue,
    }),
  },
}));

jest.mock("./use-search-params", () => ({
  useSortParams: jest.fn(),
}));

describe("useFilterEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all events when no filters applied", () => {
    (nuqs.useQueryState as jest.Mock).mockReturnValue([null, jest.fn()]);

    const { result } = renderHook(() => useFilterEvents(mockEvents));

    expect(result.current).toHaveLength(5);
    expect(result.current).toEqual(mockEvents);
  });

  it("should filter by city", () => {
    (nuqs.useQueryState as jest.Mock).mockImplementation((key: string) => {
      if (key === "city") return ["Paris", jest.fn()];
      return [null, jest.fn()];
    });

    const { result } = renderHook(() => useFilterEvents(mockEvents));

    expect(result.current).toHaveLength(3);
    expect(result.current.every(e => e.zone.city.name === "Paris")).toBe(true);
  });

  it("should filter by type", () => {
    (nuqs.useQueryState as jest.Mock).mockImplementation((key: string) => {
      if (key === "type") return ["dinner", jest.fn()];
      return [null, jest.fn()];
    });

    const { result } = renderHook(() => useFilterEvents(mockEvents));

    expect(result.current).toHaveLength(2);
    expect(result.current.every(e => e.type === "dinner")).toBe(true);
  });

  it("should filter by city and type simultaneously", () => {
    (nuqs.useQueryState as jest.Mock).mockImplementation((key: string) => {
      if (key === "city") return ["Paris", jest.fn()];
      if (key === "type") return ["dinner", jest.fn()];
      return [null, jest.fn()];
    });

    const { result } = renderHook(() => useFilterEvents(mockEvents));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].zone.city.name).toBe("Paris");
    expect(result.current[0].type).toBe("dinner");
  });
});

describe("useSortFilteredEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (nuqs.useQueryState as jest.Mock).mockReturnValue([null, jest.fn()]);
  });

  it("should return unsorted events when sort is empty", () => {
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "", order: "" },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useSortFilteredEvents(mockEvents));

    expect(result.current).toHaveLength(5);
  });

  it("should sort by date ascending", () => {
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "date", order: "asc" },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useSortFilteredEvents(mockEvents));

    expect(result.current[0].id).toBe("3"); // 2024-01-05 (oldest)
    expect(result.current[result.current.length - 1].id).toBe("4"); // 2024-01-20 (newest)
  });

  it("should sort by date descending", () => {
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "date", order: "desc" },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useSortFilteredEvents(mockEvents));

    expect(result.current[0].id).toBe("4"); // 2024-01-20 (newest)
    expect(result.current[result.current.length - 1].id).toBe("3"); // 2024-01-05 (oldest)
  });

  it("should sort by booked percentage ascending", () => {
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "booked", order: "asc" },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useSortFilteredEvents(mockEvents));

    const percentages = result.current.map(e =>
      Math.round((e.booked / e.capacity) * 100)
    );
    expect(percentages).toEqual([...percentages].sort((a, b) => a - b));
  });

  it("should sort by booked percentage descending", () => {
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "booked", order: "desc" },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useSortFilteredEvents(mockEvents));

    const percentages = result.current.map(e =>
      Math.round((e.booked / e.capacity) * 100)
    );
    expect(percentages).toEqual([...percentages].sort((a, b) => b - a));
  });

  it("should sort by status ascending", () => {
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "status", order: "asc" },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useSortFilteredEvents(mockEvents));

    const statuses = result.current.map(e => e.status);
    expect(statuses[0]).toBe("upcoming");
    expect(statuses[statuses.length - 1]).toBe("past");
  });

  it("should sort by status descending", () => {
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "status", order: "desc" },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useSortFilteredEvents(mockEvents));

    const statuses = result.current.map(e => e.status);
    expect(statuses[0]).toBe("past");
    expect(statuses[statuses.length - 1]).toBe("upcoming");
  });
});

describe("usePaginateFilteredEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (nuqs.useQueryState as jest.Mock).mockImplementation((key: string) => {
      if (key === "page") {
        return [1, jest.fn()] as unknown as ReturnType<
          typeof nuqs.useQueryState
        >;
      }
      return [null, jest.fn()];
    });
    (searchParams.useSortParams as jest.Mock).mockReturnValue([
      { sort: "", order: "" },
      jest.fn(),
    ]);
  });

  it("should paginate correctly with 10 items per page", () => {
    const { result } = renderHook(() => usePaginateFilteredEvents(mockEvents));

    expect(result.current.paginatedEvents).toHaveLength(5); // Less than 10 events
    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(false);
  });

  it("should calculate total pages correctly", () => {
    const manyEvents = Array.from({ length: 25 }, (_, i) => ({
      ...mockEvents[0],
      id: `event-${i}`,
    }));

    const { result } = renderHook(() => usePaginateFilteredEvents(manyEvents));

    expect(result.current.totalPages).toBe(3); // 25 / 10 = 2.5 rounded to 3
    expect(result.current.paginatedEvents).toHaveLength(10);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.hasPreviousPage).toBe(false);
  });

  it("should display second page correctly", () => {
    const manyEvents = Array.from({ length: 25 }, (_, i) => ({
      ...mockEvents[0],
      id: `event-${i}`,
    }));

    (nuqs.useQueryState as jest.Mock).mockImplementation((key: string) => {
      if (key === "page") {
        return [2, jest.fn()] as unknown as ReturnType<
          typeof nuqs.useQueryState
        >;
      }
      return [null, jest.fn()];
    });

    const { result } = renderHook(() => usePaginateFilteredEvents(manyEvents));

    expect(result.current.paginatedEvents).toHaveLength(10);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.hasPreviousPage).toBe(true);
  });

  it("should display last page correctly", () => {
    const manyEvents = Array.from({ length: 25 }, (_, i) => ({
      ...mockEvents[0],
      id: `event-${i}`,
    }));

    (nuqs.useQueryState as jest.Mock).mockImplementation((key: string) => {
      if (key === "page") {
        return [3, jest.fn()] as unknown as ReturnType<
          typeof nuqs.useQueryState
        >;
      }
      return [null, jest.fn()];
    });

    const { result } = renderHook(() => usePaginateFilteredEvents(manyEvents));

    expect(result.current.paginatedEvents).toHaveLength(5); // 25 - 20 = 5
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.hasPreviousPage).toBe(true);
  });
});
