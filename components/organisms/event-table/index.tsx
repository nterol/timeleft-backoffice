"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePaginateFilteredEvents } from "@/hooks/use-process-events";
import { EventList } from "@/data/event-schema";
import { columns } from "./columns";

export function EventTable({ data }: { data: EventList }) {
    const { paginatedEvents } = usePaginateFilteredEvents(data);

    console.log(paginatedEvents)




    return (
        <div data-testid="event-table" className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader data-testid="event-table-header">
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.id}>{column.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEvents.map((event) => (
                        <TableRow key={event.id}>
                            {columns.map((column) => (
                                <TableCell key={column.id} className="capitalize">
                                    {column.cell({ row: event })}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
