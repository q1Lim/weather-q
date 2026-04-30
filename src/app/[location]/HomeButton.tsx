"use client";

import { COMMON_MESSAGE } from "@/lib/messages/common";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:outline-none"
    >
      <span>←</span>
      {COMMON_MESSAGE.goHome}
    </button>
  );
};

export default HomeButton;
