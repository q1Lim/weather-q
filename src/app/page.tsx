import CurrentLocationWeather from "@/app/components/CurrentLocationWeather";
import LocationSearch from "@/app/components/LocationSearch";
import LocationList from "./components/LocationList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-white px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-wide text-sky-600 uppercase">
            Weather Q
          </p>
        </div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          도시별 날씨를 확인해보세요.
        </h1>
        <p className="my-4 max-w-2xl text-base leading-7 text-slate-600">
          도시를 선택하면 현재 날씨, 오늘의 시간별 예보, 3일 예보를 확인할 수 있습니다.
        </p>
        <LocationSearch />
        <CurrentLocationWeather />
        <LocationList />
      </section>
    </main>
  );
}
