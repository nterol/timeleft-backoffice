"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventList } from "@/data/event-schema";

import { columns } from "./columns";
import { SortableHeader } from "./sortable-header";

export function EventTable({ data }: { data: EventList }) {
  return (
    <div
      data-testid="event-table"
      className="overflow-x-auto rounded-md border"
    >
      <Table>
        <TableHeader data-testid="event-table-header">
          <TableRow>
            {columns.map(column => (
              <TableHead
                key={column.id}
                data-testid={`event-table-header-${column.id}`}
              >
                {column.isSortable ? (
                  <SortableHeader sortKey={column.sortKey}>
                    {column.header}
                  </SortableHeader>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map(event => (
              <TableRow key={event.id}>
                {columns.map(column => (
                  <TableCell key={column.id} className="capitalize">
                    {column.cell({ row: event })}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No events found for these filters !
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
