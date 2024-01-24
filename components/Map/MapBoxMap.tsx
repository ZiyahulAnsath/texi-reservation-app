"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useContext, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "0e42bfad-fe62-4d81-88d3-afcc1a300b9d";

const MapBoxMap = () => {
  const mapRef = useRef<any>();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } = useContext(
    SourceCordiContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  // use to fly to source markers Location
  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);

  // use to fly to destination markers Location
  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }

    if (sourceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  const getDirectionRoute = async () => {
    try {
      const res = await fetch(
        MAPBOX_DRIVING_ENDPOINT +
          sourceCordinates.lng +
          "," +
          sourceCordinates.lat +
          ";" +
          destinationCordinates.lng +
          "," +
          destinationCordinates.lat +
          "?overview=full&geometries=geojson&access_token=" +
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch direction data");
      }

      const result = await res.json();
      setDirectionData(result);
    } catch (error) {
      console.error("Error fetching direction data:", error);
    }
  };

  return (
    <div className="p-3 md:p-5">
      <h2 className="text-[20px] font-semibold pb-2">Map</h2>
      <div className=" rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData?.routes ? (
              <MapBoxRoute coordinates={directionData?.routes[0]?.geometry?.coordinates} />
            ) : null}
          </Map>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default MapBoxMap;
