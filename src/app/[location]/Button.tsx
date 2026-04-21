"use client";

import { useRouter } from "next/navigation";

const Button = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <button
      onClick={handleClick}
      className="mt-8 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      홈으로
    </button>
  );
};

export default Button;
