import Link from "next/link";
import CurrentLocationWeather from "@/app/components/CurrentLocationWeather";

const locations = [
  { name: "서울", path: "Seoul" },
  { name: "런던", path: "London" },
  { name: "파리", path: "Paris" },
];

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
        <CurrentLocationWeather />
        <ul className="grid gap-4 sm:grid-cols-3">
          {locations.map((location) => (
            <li key={location.path}>
              <Link
                href={`/${location.path}`}
                className="group relative flex min-h-36 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-2xl font-bold text-slate-900 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
              >
                <span className="relative">{location.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
