"use client";

import { XIcon } from "lucide-react";

import { StatusBadge } from "@/components/molecules/status-badge";
import { Button } from "@/components/ui/button";
import { getEventByID } from "@/data/get-events-data";

interface EventDetailContentProps {
    event: Awaited<ReturnType<typeof getEventByID>>;
}

export function EventDetailContent({ event }: EventDetailContentProps) {


    return (
        <>
            <header className="flex justify-end text-white">
                <form method="dialog">
                    <Button variant="ghost" >
                        <XIcon className="size-4" />
                    </Button>
                </form>
            </header>
            <main className="flex flex-col text-white">
                <h2 className="text-2xl font-bold text-white">
                    <span className="capitalize">{event.type}</span>@{event.zone.name} - ({event.zone.city.name})
                </h2>
                <p className="text-gray-50 text-xs">Date: {new Date(event.date).toLocaleDateString()}</p>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-white">Event Details</h3>
                    <p>
                        This event is <StatusBadge size="lg" status={event.status} />
                    </p>
                    <p className="text-white">
                        This event is a {event.type} event that will be held at {event.zone.name} - ({event.zone.city.name}) on {new Date(event.date).toLocaleDateString()}.
                    </p>
                    <p className="text-white">Capacity: {event.capacity}</p>
                    <p className="text-white">Booked: {event.booked}</p>
                    {(() => {
                        const percent = event.capacity
                            ? Math.round((event.booked / event.capacity) * 100)
                            : 0;

                        // Compute color from green to orange to red
                        const percentClamped = Math.max(0, Math.min(percent, 100));

                        // If 0-50: interpolate green(0,128,0)->orange(255,165,0)
                        // If 50-100: interpolate orange(255,165,0)->red(255,0,0)
                        let r, g, b;
                        if (percentClamped <= 50) {
                            // green to orange
                            const ratio = percentClamped / 50;
                            r = Math.round(0 + (255 - 0) * ratio);
                            g = Math.round(128 + (165 - 128) * ratio);
                            b = Math.round(0 + (0 - 0) * ratio);
                        } else {
                            // orange to red
                            const ratio = (percentClamped - 50) / 50;
                            r = 255;
                            g = Math.round(165 - (165 * ratio));
                            b = 0;
                        }
                        const color = `rgb(${r},${g},${b})`;

                        return (
                            <p
                                className="font-semibold"
                                style={{
                                    background: `linear-gradient(90deg, ${color}, ${color})`,
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                {percent}% booked
                            </p>
                        );
                    })()}
                </div>
            </main>
        </>
    );
}
