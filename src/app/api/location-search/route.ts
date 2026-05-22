import { NextRequest, NextResponse } from "next/server";
import { getLocationSearchResults } from "@/app/api/weather";
import { WEATHER_MESSAGE } from "@/lib/messages/weather";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ message: WEATHER_MESSAGE.emptyLocation }, { status: 400 });
  }

  try {
    const locations = await getLocationSearchResults(query);
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : WEATHER_MESSAGE.locationSearchFetchFailed(500),
      },
      { status: 500 }
    );
  }
}
