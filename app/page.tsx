'use client'
import Booking from "@/components/Booking/page";
import MapBoxMap from "@/components/Map/MapBoxMap";
import Map from "@/components/Map/page";
import { UserLocationContext } from "@/context/UserLocationContext";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [userLocation, setUserLocation] = useState<any>();

  useEffect(()=>{
    getUserLocation()
  },[])
  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
      
    })
  }
  return (
    <div>
      <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div >
          <Booking />
        </div>
        <div className="col-span-2 order-first md:order-last">
         <MapBoxMap/>
        </div>
      </div>
      </UserLocationContext.Provider>
    </div>
  );
}
