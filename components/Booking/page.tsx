import React from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";


const Booking = () => {
    // const screenHeight = window.innerHeight;
    // const screenHeight = window.innerHeight;

    return (
    <div className="p-3 md:p-5">
      <h2 className="text-[20px] font-semibold pb-2">Booking</h2>
      <div className="border-[1px] rounded-md p-4 ">
      <AutoCompleteAddress />
      </div>
    </div>
  );
};

export default Booking;
