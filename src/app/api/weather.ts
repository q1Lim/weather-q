import { CurrentWeatherResponse } from '@/app/types'

export async function getCurrentWeather(location: string): Promise<CurrentWeatherResponse> {
  const apiKey = process.env.WEATHER_API_KEY
  if (!apiKey) {
    throw new Error('WEATHER_API_KEY가 설정되어 있지 않습니다.')
  }

  const apiPath = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
  const response = await fetch(apiPath)

  if (!response.ok) {
    throw new Error('날씨 정보를 가져올 수 없습니다.')
  }
  return response.json()
}
