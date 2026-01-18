import { ComponentType } from "react";

import { DinnerIcon } from "@/assets/icons/dinner";
import { DrinkIcon } from "@/assets/icons/drink";
import { RunIcon } from "@/assets/icons/run";
import { type EventType } from "@/data/event-schema";

import { Pill } from "../atoms/pill";

const iconMap = new Map<EventType, { icon: ComponentType<{ className?: string }>; variant: "primary" | "secondary" | "ternary" }>([
    ["dinner", {
        icon: DinnerIcon,
        variant: "primary"
    }],
    ["drink", {
        icon: DrinkIcon,
        variant: "secondary"
    }],
    ["run", {
        icon: RunIcon,
        variant: "ternary"
    }],
])

export function PillIcon({ type }: { type: "dinner" | "drink" | "run" }) {
    const iconElement = iconMap.get(type);
    if (!iconElement) return null;

    const Icon = iconElement.icon;
    return <Pill variant={iconElement.variant}>{Icon ? <Icon className="size-4" /> : null}</Pill>
}