import { EventStatus } from "@/data/event-schema";

import { Badge } from "../atoms/badge";

export function StatusBadge({ status, size }: { status: EventStatus, size?: "sm" | "md" | "lg" }) {
    return <Badge size={size} variant={status === "live" ? "primary" : status === "upcoming" ? "secondary" : "ternary"}>{status}</Badge>
}