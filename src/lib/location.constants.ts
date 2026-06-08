import { SavedLocation } from "@/app/types";

export const DEFAULT_LOCATIONS: SavedLocation[] = [
  {
    nameKo: "서울",
    nameEn: "Seoul",
    countryKo: "대한민국",
    countryEn: "South Korea",
    query: "Seoul",
  },
  {
    nameKo: "런던",
    nameEn: "London",
    countryKo: "영국",
    countryEn: "United Kingdom",
    query: "London",
  },
  {
    nameKo: "파리",
    nameEn: "Paris",
    countryKo: "프랑스",
    countryEn: "France",
    query: "Paris",
  },
];

export const NOMINATIM_API_BASE_URL = "https://nominatim.openstreetmap.org";

export const NOMINATIM_API_ROUTES = {
  search: "/search",
  reverse: "/reverse",
} as const;

export const LOCATION_REVALIDATE_SECONDS = {
  search: 3600,
  reverse: 3600,
} as const;

export const LOCATION_SEARCH_LIMIT = 10;
