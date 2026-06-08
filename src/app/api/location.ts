import { LOCATION_MESSAGE } from "@/lib/messages/location";
import { LocationSearchResponse, NominatimSearchResult } from "../types";
import {
  LOCATION_REVALIDATE_SECONDS,
  LOCATION_SEARCH_LIMIT,
  NOMINATIM_API_BASE_URL,
  NOMINATIM_API_ROUTES,
} from "@/lib/location.constants";
import { fetchWithTimeout, normalizeQueryParam } from "@/lib/util/common";

function getLocationName(location: NominatimSearchResult): string {
  return (
    location.address?.city ??
    location.address?.town ??
    location.address?.village ??
    location.name ??
    location.display_name.split(",")[0]
  );
}

async function getEnglishLocationByCoordinates(
  lat: string,
  lon: string
): Promise<NominatimSearchResult | null> {
  try {
    const response = await fetchWithTimeout(
      `${NOMINATIM_API_BASE_URL}${NOMINATIM_API_ROUTES.reverse}?lat=${lat}&lon=${lon}&format=json&addressdetails=1&accept-language=en`,
      {
        headers: {
          "User-Agent": "weather-q/0.1.0",
        },
        next: { revalidate: LOCATION_REVALIDATE_SECONDS.reverse },
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export async function getLocationSearchResults(query: string): Promise<LocationSearchResponse> {
  const searchQuery = normalizeQueryParam(query, LOCATION_MESSAGE.emptySearchQuery);

  const response = await fetch(
    `${NOMINATIM_API_BASE_URL}${NOMINATIM_API_ROUTES.search}?q=${searchQuery}&format=json&limit=${LOCATION_SEARCH_LIMIT}&addressdetails=1&accept-language=ko`,
    {
      headers: {
        "User-Agent": "weather-q/0.1.0",
      },
      next: { revalidate: LOCATION_REVALIDATE_SECONDS.search },
    }
  );

  if (!response.ok) {
    throw new Error(LOCATION_MESSAGE.searchFailed);
  }

  const locations: NominatimSearchResult[] = await response.json();

  const cityLikeLocations = locations.filter(
    (location) =>
      location.address?.city ||
      location.address?.town ||
      location.address?.village ||
      location.address?.state
  );

  const filteredLocations = cityLikeLocations.length > 0 ? cityLikeLocations : locations;

  return Promise.all(
    filteredLocations.map(async (location) => {
      const nameKo = getLocationName(location);
      const countryKo = location.address?.country ?? "";

      const englishLocation = await getEnglishLocationByCoordinates(location.lat, location.lon);
      const nameEn = englishLocation ? getLocationName(englishLocation) : nameKo;
      const countryEn = englishLocation?.address?.country ?? countryKo;

      return {
        id: String(location.place_id),
        nameKo,
        nameEn,
        countryKo,
        countryEn,
        lat: Number(location.lat),
        lon: Number(location.lon),
        query: nameEn,
      };
    })
  );
}
