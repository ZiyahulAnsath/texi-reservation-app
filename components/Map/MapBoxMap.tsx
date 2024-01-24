"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useContext, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";

const MapBoxMap = () => {
  const mapRef = useRef<any>();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } = useContext(
    SourceCordiContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordiContext
  );


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
  }, [destinationCordinates]);



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
          </Map>
        ) : null}
      </div>
    </div>
  );
};

export default MapBoxMap;
