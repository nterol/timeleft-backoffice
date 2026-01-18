import { parseAsStringLiteral, useQueryStates } from "nuqs";

export const useSortParams = () =>
    useQueryStates({
        sort: parseAsStringLiteral(["date", "booked", "status", ""]).withDefault(
            ""
        ),
        order: parseAsStringLiteral(["asc", "desc", ""]).withDefault(""),
    });
