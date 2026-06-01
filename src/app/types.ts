export interface CurrentWeatherResponse {
  location: Location;
  current: Current;
}

export interface ForecastWeatherResponse {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  day: ForecastDayInfo;
  hour: ForecastHour[];
}

export interface ForecastDayInfo {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: Condition;
}

export interface ForecastHour {
  time: string;
  temp_c: number;
  condition: Condition;
  chance_of_rain: number;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface Current {
  last_updated: string;
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  condition: Condition;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface SavedLocation {
  nameKo: string;
  nameEn: string;
  countryKo: string;
  countryEn: string;
  query: string;
}

export interface LocationSearchResult {
  id: string;
  nameKo: string;
  nameEn: string;
  countryKo: string;
  countryEn: string;
  lat: number;
  lon: number;
  query: string;
}

export type LocationSearchResponse = LocationSearchResult[];

export interface NominatimSearchResult {
  place_id: number;
  name?: string;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}
