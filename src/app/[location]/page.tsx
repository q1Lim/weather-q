import HomeButton from "@/app/[location]/HomeButton";
import { getCurrentWeather, getForecastWeather } from "@/app/api/weather";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_ERROR_CODE } from "@/lib/messages/location";

type Props = {
  params: Promise<{
    location: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const decodedLocation = decodeURIComponent(location);
  const title = `${decodedLocation} 날씨 예보`;
  const description = `${decodedLocation}의 현재 날씨, 시간별 예보, 3일 예보를 확인하세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${location}`,
      siteName: "Weather Q",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function Detail({ params }: Props) {
  const { location } = await params;

  let currentWeatherData;
  let forecastWeatherData;

  try {
    currentWeatherData = await getCurrentWeather(location);
    forecastWeatherData = await getForecastWeather(location);
  } catch (error) {
    if (error instanceof Error && error.message === LOCATION_ERROR_CODE.notFound) {
      notFound();
    }

    throw error;
  }

  // 3시간별로 오늘의 예보 보여주기
  const todayForecast = forecastWeatherData.forecast.forecastday[0];
  const now = new Date(currentWeatherData.location.localtime).getTime();
  const threeHourForecast = todayForecast.hour
    .filter((hour) => new Date(hour.time).getTime() >= now)
    .filter((_, index) => index % 3 === 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-white px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-sm font-semibold tracking-wide text-sky-600 uppercase">
            City of Weather
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {currentWeatherData.location.name}의 날씨 예보
          </h1>
          <p className="my-4 text-sm text-slate-500">
            기준 시각: {currentWeatherData.location.localtime}
          </p>
        </header>
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-500">현재 날씨</h2>
              <p className="mt-3 text-6xl font-bold tracking-tight text-slate-950">
                {currentWeatherData.current.temp_c}°C
              </p>
              <p className="mt-2 text-base text-slate-600">
                {currentWeatherData.current.condition.text}
              </p>
            </div>

            <Image
              className="h-24 w-24"
              src={`https:${currentWeatherData.current.condition.icon}`}
              alt={currentWeatherData.current.condition.text}
              width={96}
              height={96}
            />
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">체감 온도</dt>
              <dd className="mt-1 text-lg font-semibold">
                {currentWeatherData.current.feelslike_c}°C
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">습도</dt>
              <dd className="mt-1 text-lg font-semibold">{currentWeatherData.current.humidity}%</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">풍속</dt>
              <dd className="mt-1 text-lg font-semibold">
                {currentWeatherData.current.wind_kph}km/h
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">업데이트</dt>
              <dd className="mt-1 text-sm font-semibold">
                {currentWeatherData.current.last_updated}
              </dd>
            </div>
          </dl>
        </section>
        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">오늘의 시간별 예보</h2>
              <p className="mt-1 text-sm text-slate-500">
                현재 시각 이후 3시간 간격으로 보여줍니다.
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {threeHourForecast.map((hour) => (
              <article
                key={hour.time}
                className="min-w-36 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              >
                <h3 className="text-sm font-semibold text-slate-500">{hour.time.split(" ")[1]}</h3>
                <Image
                  className="mx-auto my-3 h-12 w-12"
                  src={`https:${hour.condition.icon}`}
                  alt={hour.condition.text}
                  width={48}
                  height={48}
                />
                <p className="text-2xl font-bold text-slate-950">{hour.temp_c}°C</p>
                <p className="mt-1 text-xs text-slate-500">{hour.condition.text}</p>
                <p className="mt-3 text-xs font-medium text-sky-600">
                  강수확률 {hour.chance_of_rain}%
                </p>
              </article>
            ))}
          </div>
        </section>
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight">3일 예보</h2>
            <p className="mt-1 text-sm text-slate-500">오늘부터 3일간의 날씨 흐름을 확인합니다.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {forecastWeatherData.forecast.forecastday.map((day) => (
              <article
                key={day.date}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{day.date}</h3>
                    <p className="mt-1 text-sm text-slate-500">{day.day.condition.text}</p>
                  </div>

                  <Image
                    className="h-14 w-14"
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    width={56}
                    height={56}
                  />
                </div>

                <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <dt className="text-xs text-slate-500">평균</dt>
                    <dd className="mt-1 text-sm font-bold text-slate-900">{day.day.avgtemp_c}°C</dd>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <dt className="text-xs text-slate-500">최고</dt>
                    <dd className="mt-1 text-sm font-bold text-slate-900">{day.day.maxtemp_c}°C</dd>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <dt className="text-xs text-slate-500">최저</dt>
                    <dd className="mt-1 text-sm font-bold text-slate-900">{day.day.mintemp_c}°C</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
        <div className="mt-8">
          <HomeButton />
        </div>
      </div>
    </main>
  );
}
