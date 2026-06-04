import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-sky-50 px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
        <p className="text-sm font-bold text-sky-600 uppercase">404 ERROR</p>
        <div>
          <h1 className="text-4xl font-bold text-slate-950">날씨 정보를 찾을 수 없습니다.</h1>
          <p className="mt-4 text-lg text-slate-600">
            요청한 도시의 날씨 정보를 불러올 수 없습니다. 도시명을 다시 확인해주세요.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
