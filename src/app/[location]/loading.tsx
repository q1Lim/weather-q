export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-white px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl animate-pulse">
        <header className="mb-8">
          <p className="text-sm font-semibold tracking-wide text-sky-600 uppercase">
            City of Weather
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">날씨 예보를 불러오는 중입니다.</h1>
          <p className="mt-3 text-sm text-slate-500">잠시만 기다려주세요.</p>
        </header>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-6 w-28 rounded-full bg-slate-100" />
          <div className="mt-6 h-16 w-40 rounded-2xl bg-slate-100" />

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="h-20 rounded-2xl bg-slate-100" />
            <div className="h-20 rounded-2xl bg-slate-100" />
            <div className="h-20 rounded-2xl bg-slate-100" />
            <div className="h-20 rounded-2xl bg-slate-100" />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 h-7 w-44 rounded-full bg-slate-100" />
          <div className="flex gap-4 overflow-hidden pb-2">
            <div className="h-40 min-w-36 rounded-2xl bg-white shadow-sm" />
            <div className="h-40 min-w-36 rounded-2xl bg-white shadow-sm" />
            <div className="h-40 min-w-36 rounded-2xl bg-white shadow-sm" />
          </div>
        </section>

        <section>
          <div className="mb-4 h-7 w-28 rounded-full bg-slate-100" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-40 rounded-2xl bg-white shadow-sm" />
            <div className="h-40 rounded-2xl bg-white shadow-sm" />
            <div className="h-40 rounded-2xl bg-white shadow-sm" />
          </div>
        </section>
      </div>
    </main>
  );
}
