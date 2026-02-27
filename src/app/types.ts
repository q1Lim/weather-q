export interface CurrentWeatherResponse {
  location: Location
  current: Current
}

export interface ForecastWeatherResponse {
  location: Location
  current: Current
  forecast: Forecast
}

export interface Forecast {
  forecastday: ForecastDay[]
}

export interface ForecastDay {
  date: string
  day: ForecastDayInfo
  hour: ForecastHour[]
}

export interface ForecastDayInfo {
  maxtemp_c: number
  mintemp_c: number
  avgtemp_c: number
  condition: Condition
}

export interface ForecastHour {
  time: string
  temp_c: number
  condition: Condition
  chance_of_rain: number
}

export interface Location {
  name: string
  region: string
  country: string
  localtime: string
}

export interface Current {
  temp_c: number
  condition: Condition
}

export interface Condition {
  text: string
  icon: string
  code: number
}
