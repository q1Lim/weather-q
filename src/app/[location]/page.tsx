import Button from '@/app/[location]/Button'
import { getCurrentWeather } from '@/app/api/weather'

type Props = {
  params: Promise<{
    location: string
  }>
}

export default async function Detail({ params }: Props) {
  const { location } = await params
  const data = await getCurrentWeather(location)
  return (
    <>
      <h1>{location}의 3일 예보</h1>
      <p>온도: {data.current.temp_c}℃</p>
      <p>상태: {data.current.condition.text}</p>
      <Button />
    </>
  )
}
