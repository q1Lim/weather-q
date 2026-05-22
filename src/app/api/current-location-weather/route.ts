import { NextRequest, NextResponse } from "next/server";
import { getCurrentWeather } from "@/app/api/weather";
import { GEOLOCATION_MESSAGE } from "@/lib/messages/geolocation";
import { WEATHER_MESSAGE } from "@/lib/messages/weather";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ message: GEOLOCATION_MESSAGE.emptyLatLon }, { status: 400 });
  }

  try {
    const weather = await getCurrentWeather(`${lat},${lon}`);
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : WEATHER_MESSAGE.currentLocationFetchFailed,
      },
      { status: 500 }
    );
  }
}
