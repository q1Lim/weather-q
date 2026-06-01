import { NextRequest, NextResponse } from "next/server";
import { getLocationSearchResults } from "@/app/api/location";
import { LOCATION_MESSAGE } from "@/lib/messages/location";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ message: LOCATION_MESSAGE.emptySearchQuery }, { status: 400 });
  }

  try {
    const locations = await getLocationSearchResults(query);
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : LOCATION_MESSAGE.searchFailed,
      },
      { status: 500 }
    );
  }
}
