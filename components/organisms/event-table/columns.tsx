import { Event } from "@/data/event-schema";
import Link from "next/link";



export const columns = [
    {
        id: "id",
        header: "ID",
        cell: ({ row }: { row: Event }) => (
            <Link
                className="hover:underline text-gray-500 capitalize"
                href={`/events/${row.id}`}
            >
                {row.id}
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
        cell: ({ row }: { row: Event }) => <>{row.type}</>,
    }, {
        id: "status",
        header: "Status",
        cell: ({ row }: { row: Event }) => <>{row.status}</>,
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
