import Button from '@/app/[location]/Button'
import { getCurrentWeather, getForecastWeather } from '@/app/api/weather'

type Props = {
  params: Promise<{
    location: string
  }>
}

export default async function Detail({ params }: Props) {
  const { location } = await params

  const currentWeatherData = await getCurrentWeather(location)
  const forecastWeatherData = await getForecastWeather(location)

  return (
    <main>
      <h1>{currentWeatherData.location.name}의 날씨 예보</h1>
      <p>기준 시각 : {currentWeatherData.location.localtime}</p>
      <section>
        <h2>현재 날씨</h2>
        <p>현재 기온: {currentWeatherData.current.temp_c}°C</p>
        <p>상태: {currentWeatherData.current.condition.text}</p>
        <img
          src={`https:${currentWeatherData.current.condition.icon}`}
          alt={currentWeatherData.current.condition.text}
        />
      </section>
      <section>
        <h2>3일 예보</h2>
        {forecastWeatherData.forecast.forecastday.map((day) => (
          <section key={day.date}>
            <h3>{day.date}</h3>
            <p>평균 기온: {day.day.avgtemp_c}°C</p>
            <p>최고: {day.day.maxtemp_c}°C</p>
            <p>최저: {day.day.mintemp_c}°C</p>
            <p>상태: {day.day.condition.text}</p>
            <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
          </section>
        ))}
      </section>
      <Button />
    </main>
  )
}
