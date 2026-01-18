"use client";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useSortParams } from "./use-search-params";
import { EventStatus, EventList } from "@/data/event-schema";

// Calling these hooks but they merely are utils
export function useFilterEvents(data: EventList) {
    const [city] = useQueryState("city");
    const [type] = useQueryState("type");

    return useMemo(() => {
        return data
            .filter((event) => {
                if (!city) return true;
                return event.zone.city.name === city;
            })
            .filter((event) => {
                if (!type) return true;
                return event.type === type;
            });
    }, [data, city, type]);
}

export function useSortFilteredEvents(data: EventList) {
    const filteredEvents = useFilterEvents(data);
    const sortParams = useSortParams();

    // Extraire sort et order pour éviter les problèmes de référence d'objet
    const sort = sortParams[0].sort;
    const order = sortParams[0].order;

    return useMemo(() => {
        if (sort === "") return filteredEvents;
        if (sort === "date") {
            return filteredEvents.toSorted((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                if (order === "desc") {
                    return dateB - dateA;
                }
                return dateA - dateB;
            });
        }
        if (sort === "booked") {
            return filteredEvents.toSorted((a, b) => {
                const percentA = Math.round((a.booked / a.capacity) * 100);
                const percentB = Math.round((b.booked / b.capacity) * 100);
                if (order === "desc") {
                    return percentB - percentA;
                }
                return percentA - percentB;
            });
        }
        if (sort === "status") {
            const statusOrderAsc = ["upcoming", "live", "past"] as EventStatus[];

            const orderArray =
                order === "desc" ? statusOrderAsc.reverse() : statusOrderAsc;
            return filteredEvents.toSorted(
                (a, b) => orderArray.indexOf(a.status) - orderArray.indexOf(b.status)
            );
        }
        return filteredEvents;
    }, [filteredEvents, sort, order]);
}

// Hard Coded for the moment this should a client side setting
const ITEMS_PER_PAGE = 10;

export function usePaginateFilteredEvents(data: EventList) {
    const sortedEvents = useSortFilteredEvents(data);
    const [currentPage] = useQueryState("page", parseAsInteger.withDefault(1));

    return useMemo(() => {
        const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedEvents = sortedEvents.slice(startIndex, endIndex);

        return {
            totalPages,
            paginatedEvents,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        };
    }, [sortedEvents, currentPage]);
}
