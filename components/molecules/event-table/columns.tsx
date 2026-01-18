import Link from "next/link";

import { Badge } from "@/components/atoms/badge";
import { PillIcon } from "@/components/molecules/pill-icon";
import { Event } from "@/data/event-schema";

export const columns = [
  {
    id: "id",
    header: "ID",
    cell: ({ row }: { row: Event }) => (
      <Link
        className="text-gray-500 capitalize hover:underline"
        href={`/events/${row.id}`}
      >
        #{row.id}
      </Link>
    ),
  },
  {
    id: "date",
    header: "Date",
    isSortable: true,
    sortKey: "date",
    cell: ({ row }: { row: Event }) => (
      <>{new Date(row.date).toLocaleDateString()}</>
    ),
  },
  {
    id: "zone",
    header: "Zone",
    cell: ({ row }: { row: Event }) => <>{row.zone.name}</>,
  },
  {
    id: "type",
    header: "Type",
    cell: ({ row }: { row: Event }) => (
      <span className="flex items-center gap-2">
        <PillIcon type={row.type} />
        {row.type}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    isSortable: true,
    sortKey: "status",
    cell: ({ row }: { row: Event }) => (
      <Badge
        variant={
          row.status === "live"
            ? "primary"
            : row.status === "upcoming"
              ? "secondary"
              : "ternary"
        }
      >
        {row.status}
      </Badge>
    ),
  },
  {
    id: "booked",
    header: "Booked",
    isSortable: true,
    sortKey: "booked",
    cell: ({ row }: { row: Event }) => <>{row.booked}</>,
  },
  {
    id: "capacity",
    header: "Capacity",
    cell: ({ row }: { row: Event }) => <>{row.capacity}</>,
  },
];
