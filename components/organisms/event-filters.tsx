import { EventList } from "@/data/event-schema";
import { DropdownFilter } from "../molecules/dropdown-filter";

export function EventFilters({ data }: { data: EventList }) {
    const cities = [...new Set(data.map((event) => event.zone.city.name))];
    const type = [...new Set(data.map((event) => event.type))];

    return (
        <section data-testid="event-filters" className="flex gap-3 items-baseline">
            <DropdownFilter label="City" name="city" values={cities} />
            <DropdownFilter label="Type" name="type" values={type} />
        </section>
    );
}
