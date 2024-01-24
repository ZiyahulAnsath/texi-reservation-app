import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get('q');

  const res = await fetch(
    BASE_URL +
      '?q=' +
      searchText +
      '&language=en&limit=8&session_token=093bd860-660b-47e1-88d2-ab0ec5903180&country=US' +
      '&access_token=' +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const searchResult = await res.json();

  return NextResponse.json(searchResult);
}
