import { CurrentWeatherResponse, ForecastWeatherResponse } from "@/app/types";
import { WEATHER_MESSAGE } from "@/lib/messages/weather";
import {
  WEATHER_API_BASE_URL,
  WEATHER_API_ROUTES,
  DEFAULT_LANG,
  DEFAULT_FORECAST_DAYS,
} from "@/lib/weather.constants";

function getApiKey(): string {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error(WEATHER_MESSAGE.emptyLocation);
  }

  return apiKey;
}

function normalizeLocation(location: string): string {
  const trimmed = location.trim();
  if (!trimmed) {
    throw new Error(WEATHER_MESSAGE.emptyLocation);
  }

  return encodeURIComponent(trimmed);
}

export async function getCurrentWeather(location: string): Promise<CurrentWeatherResponse> {
  const apiKey = getApiKey();
  const queryLocation = normalizeLocation(location);

  const apiPath = `${WEATHER_API_BASE_URL}${WEATHER_API_ROUTES.current}?key=${apiKey}&q=${queryLocation}&lang=${DEFAULT_LANG}`;
  const response = await fetch(apiPath, {
    // Next 서버 fetch 캐시 (10분)
    next: { revalidate: 600 },
  });

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
  const queryLocation = normalizeLocation(location);

  const apiPath = `${WEATHER_API_BASE_URL}${WEATHER_API_ROUTES.forecast}?key=${apiKey}&q=${queryLocation}&days=${days}&lang=${DEFAULT_LANG}`;
  const response = await fetch(apiPath, {
    // Next 서버 fetch 캐시 (10분)
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(WEATHER_MESSAGE.forecastFetchFailed(response.status));
  }

  return response.json();
}
