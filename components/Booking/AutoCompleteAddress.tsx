"use client";

import React, { useEffect, useState } from "react";

const AutoCompleteAddress = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [addressList, setAddressList] = useState<any>([]);
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
                  setSource(item.full_address);
                  setAddressList([]);
                  setSourceChange(false);
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
                    setDestination(item.full_address);
                    setAddressList([]);
                    setDestinationChange(false);
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
