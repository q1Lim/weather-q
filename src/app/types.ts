export interface CurrentWeatherResponse {
  location: Location
  current: Current
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
