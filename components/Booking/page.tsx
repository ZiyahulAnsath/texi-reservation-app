import React from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";

const Booking = () => {
  // const screenHeight = window.innerHeight;
  // const screenHeight = window.innerHeight;

  return (
    <div className="p-3 md:p-5">
      <h2 className="text-[20px] font-semibold pb-2">Booking</h2>
      <div className="border-[1px] rounded-md p-4 ">
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <button className="w-full bg-blue-600 p-1 rounded-md mt-4 text-white hover:scale-105 transition-all hover:font-semibold">
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
