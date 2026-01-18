import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";

export const sortKeys = ["date", "booked", "status"] as const;

export type SortKey = (typeof sortKeys)[number];

export const useSortParams = () =>
  useQueryStates({
    sort: parseAsStringLiteral([...sortKeys, ""]).withDefault(""),
    order: parseAsStringLiteral(["asc", "desc", ""]).withDefault(""),
  });

export const useAllEventSearchParams = () =>
  useQueryStates({
    city: parseAsString,
    type: parseAsString,
    sort: parseAsStringLiteral([...sortKeys, ""]).withDefault(""),
    order: parseAsStringLiteral(["asc", "desc", ""]).withDefault(""),
    page: parseAsInteger.withDefault(1),
  });
