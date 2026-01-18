"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePaginateFilteredEvents } from "@/hooks/use-process-events";
import { EventList } from "@/data/event-schema";
import { columns } from "./columns";

export function EventTable({ data }: { data: EventList }) {
    const { paginatedEvents } = usePaginateFilteredEvents(data);

    console.log(paginatedEvents)




    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
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
                                <TableCell key={column.id}>
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
