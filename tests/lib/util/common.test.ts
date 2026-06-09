import { normalizeQueryParam } from "@/lib/util/common";
import { describe, expect, it } from "vitest";

describe("normalizeQueryParam", () => {
  it("앞뒤 공백을 제거하고 값을 인코딩한다", () => {
    expect(normalizeQueryParam(" Seoul ", "empty")).toBe("Seoul");
  });

  it("한글 값을 URL query param으로 사용할 수 있게 인코딩한다", () => {
    expect(normalizeQueryParam("서울", "empty")).toBe("%EC%84%9C%EC%9A%B8");
  });

  it("빈 문자열이면 에러를 던진다", () => {
    expect(() => normalizeQueryParam("   ", "도시명이 비어있습니다.")).toThrow(
      "도시명이 비어있습니다."
    );
  });
});
