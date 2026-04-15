"use client";

import Button from "@/app/[location]/Button";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <main>
      <h1>에러가 발생했습니다.</h1>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
      <Button />
    </main>
  );
}
