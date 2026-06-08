import { CurrentWeatherResponse, ForecastWeatherResponse } from "@/app/types";
import { LOCATION_ERROR_CODE } from "@/lib/messages/location";
import { WEATHER_MESSAGE } from "@/lib/messages/weather";
import { normalizeQueryParam } from "@/lib/util/common";
import {
  WEATHER_API_BASE_URL,
  WEATHER_API_ROUTES,
  DEFAULT_LANG,
  DEFAULT_FORECAST_DAYS,
  WEATHER_REVALIDATE_SECONDS,
} from "@/lib/weather.constants";

function getApiKey(): string {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error(WEATHER_MESSAGE.emptyLocation);
  }

  return apiKey;
}

export async function getCurrentWeather(location: string): Promise<CurrentWeatherResponse> {
  const apiKey = getApiKey();
  const queryLocation = normalizeQueryParam(location, WEATHER_MESSAGE.emptyLocation);

  const apiPath = `${WEATHER_API_BASE_URL}${WEATHER_API_ROUTES.current}?key=${apiKey}&q=${queryLocation}&lang=${DEFAULT_LANG}`;
  const response = await fetch(apiPath, {
    next: { revalidate: WEATHER_REVALIDATE_SECONDS.current },
  });

  if (response.status === 400 || response.status === 404) {
    throw new Error(LOCATION_ERROR_CODE.notFound);
  }

  if (!response.ok) {
    throw new Error(WEATHER_MESSAGE.currentFetchFailed(response.status));
  }
  return response.json();
}

export async function getForecastWeather(
  location: string,
  days: number = DEFAULT_FORECAST_DAYS
): Promise<ForecastWeatherResponse> {
  const apiKey = getApiKey();
  const queryLocation = normalizeQueryParam(location, WEATHER_MESSAGE.emptyLocation);

  const apiPath = `${WEATHER_API_BASE_URL}${WEATHER_API_ROUTES.forecast}?key=${apiKey}&q=${queryLocation}&days=${days}&lang=${DEFAULT_LANG}`;
  const response = await fetch(apiPath, {
    next: { revalidate: WEATHER_REVALIDATE_SECONDS.forecast },
  });

  if (response.status === 400 || response.status === 404) {
    throw new Error(LOCATION_ERROR_CODE.notFound);
  }

  if (!response.ok) {
    throw new Error(WEATHER_MESSAGE.forecastFetchFailed(response.status));
  }

  return response.json();
}
