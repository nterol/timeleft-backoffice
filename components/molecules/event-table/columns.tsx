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
                className="hover:underline text-gray-500 capitalize"
                href={`/events/${row.id}`}
            >
                #{row.id}
            </Link>
        ),
    }, {
        id: "date",
        header: "Date",
        cell: ({ row }: { row: Event }) => <>{new Date(row.date).toLocaleDateString()}</>,
    }, {
        id: "zone",
        header: "Zone",
        cell: ({ row }: { row: Event }) => <>{row.zone.name}</>,
    }, {
        id: "type",
        header: "Type",
        cell: ({ row }: { row: Event }) => <span className="flex gap-2 items-center"><PillIcon type={row.type} />{row.type}</span>,
    }, {
        id: "status",
        header: "Status",
        cell: ({ row }: { row: Event }) => <Badge variant={row.status === "live" ? "primary" : row.status === "upcoming" ? "secondary" : "ternary"}>{row.status}</Badge>,
    }, {
        id: "booked",
        header: "Booked",
        cell: ({ row }: { row: Event }) => <>{row.booked}</>,
    }, {
        id: "capacity",
        header: "Capacity",
        cell: ({ row }: { row: Event }) => <>{row.capacity}</>,
    },
];