import { NextRequest, NextResponse } from "next/server";
import { getCurrentWeather } from "@/app/api/weather";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ message: "위도와 경도 정보가 필요합니다." }, { status: 400 });
  }

  try {
    const weather = await getCurrentWeather(`${lat},${lon}`);
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "현재 위치의 날씨 정보를 불러오지 못했습니다.",
      },
      { status: 500 }
    );
  }
}
