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

  // 3시간별로 오늘의 예보 보여주기
  const todayForecast = forecastWeatherData.forecast.forecastday[0]
  const now = new Date(currentWeatherData.location.localtime).getTime()
  const threeHourForecast = todayForecast.hour
    .filter((hour) => new Date(hour.time).getTime() >= now)
    .filter((_, index) => index % 3 === 0)

  return (
    <main>
      <h1>{currentWeatherData.location.name}의 날씨 예보</h1>
      <p>기준 시각 : {currentWeatherData.location.localtime}</p>
      <section>
        <h2>현재 날씨</h2>
        <p>마지막 업데이트: {currentWeatherData.current.last_updated}</p>
        <p>현재 기온: {currentWeatherData.current.temp_c}°C</p>
        <p>체감 온도: {currentWeatherData.current.feelslike_c}°C</p>
        <p>습도: {currentWeatherData.current.humidity}%</p>
        <p>풍속: {currentWeatherData.current.wind_kph}km/h</p>
        <p>상태: {currentWeatherData.current.condition.text}</p>
        <img
          src={`https:${currentWeatherData.current.condition.icon}`}
          alt={currentWeatherData.current.condition.text}
        />
      </section>
      <section>
        <h2>오늘의 시간별 예보</h2>
        {threeHourForecast.map((hour) => (
          <section key={hour.time}>
            <h3>{hour.time}</h3>
            <p>기온: {hour.temp_c}°C</p>
            <p>강수확률: {hour.chance_of_rain}%</p>
            <p>상태: {hour.condition.text}</p>
            <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
          </section>
        ))}
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
