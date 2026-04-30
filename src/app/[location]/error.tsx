"use client";

import HomeButton from "@/app/[location]/HomeButton";
import { COMMON_MESSAGE } from "@/lib/messages/common";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-white px-6 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold tracking-wide text-red-500 uppercase">
            Weather Error
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            날씨 정보를 불러오지 못했습니다.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">{error.message}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:outline-none"
            >
              {COMMON_MESSAGE.retry}
            </button>
            <HomeButton />
          </div>
        </section>
      </div>
    </main>
  );
}
