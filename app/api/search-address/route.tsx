import { NextResponse } from "next/server";
const BASE_URL = "https://api.mapbox.com/search/searchbox/vl/suggest";
export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");
  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "?language=en&limit=6&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=US" +
      "&access_token=" +
      process.env.MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const searchResult = await res.json();

  return NextResponse.json({ data: searchResult });
}