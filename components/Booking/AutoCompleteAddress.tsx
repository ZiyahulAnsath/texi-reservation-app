"use client";

import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import React, { useContext, useEffect, useState } from "react";
const session_token = "0e42bfad-fe62-4d81-88d3-afcc1a300b9d";
const MAPBOX_PRIVATE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const AutoCompleteAddress = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [addressList, setAddressList] = useState<any>([]);
  const {sourceCordinates, setSourceCordinates} = useContext(SourceCordiContext);
  const {destinationCordinates, setDestinationCordinates} = useContext(DestinationCordiContext)
  const [sourceChange, setSourceChange] = useState<boolean>(false);
  const [destinationChange, setDestinationChange] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getAddressList();
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [source, destination]);

  const getAddressList = async () => {
    setAddressList([]);
    const query = sourceChange ? source : destination;
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Error fetching data:", res.status, res.statusText);
      return;
    }

    try {
      const result = await res.json();
      setAddressList(result);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const onSourceAddressCLick = async (item: any) => {
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false);
    const res = await fetch(
      MAPBOX_PRIVATE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();
    setSourceCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  const onDestinationAddressCLick = async (item: any) => {
    setDestination(item.full_address);
    setAddressList([]);
    setDestinationChange(false);
    const res = await fetch(
      MAPBOX_PRIVATE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();
    setDestinationCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  return (
    <div>
      <div className="relative">
        <label className="text-gray-500">Where from?</label>
        <input
          type="text"
          name="from"
          className="focus:bg-slate-100 p-1 w-full rounded-md border-[1px] outline-none"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
            setDestinationChange(false);
          }}
        />

        {addressList?.suggestions && sourceChange ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                className="p-3 hover:bg-gray-200 cursor-pointer rounded-lg"
                key={index}
                onClick={() => {
                  onSourceAddressCLick(item);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-4">
        <div className="relative">
          <label className="text-gray-500">Where To?</label>
          <input
            type="text"
            name="to"
            className="focus:bg-slate-100 p-1 w-full rounded-md border-[1px] outline-none"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setDestinationChange(true);
              setSourceChange(false);
            }}
          />
          {addressList?.suggestions && destinationChange ? (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
              {addressList?.suggestions.map((item: any, index: number) => (
                <h2
                  className="p-3 hover:bg-gray-200 cursor-pointer rounded-lg"
                  key={index}
                  onClick={() => {
                    onDestinationAddressCLick(item);
                  }}
                >
                  {item.full_address}
                </h2>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
