import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get('q');

  const res = await fetch(
    BASE_URL +
      '?q=' +
      searchText +
      '&language=en&limit=8&session_token=0e42bfad-fe62-4d81-88d3-afcc1a300b9d&country=US' +
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
