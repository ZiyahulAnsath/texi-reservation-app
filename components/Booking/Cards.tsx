'use client'

import PaymentOptions from "@/data/PaymentOptions";
import Image from "next/image";
import { useState } from "react";

const Cards = () => {
    const [selectPayment, setSelectPayment] = useState<any>();
  return (
    <div className="mt-3">
      <h2 className="text-[14px] font-medium">Payment Method</h2>
      <div className="grid grid-cols-3 w-full">
        {PaymentOptions.map((item, index) => (
          <div key={index} className={`cursor-pointer p-2 m-2 border-[1px] rounded-md hover:border-blue-600 hover:scale-110 transition-all ${index==selectPayment?'border-2 border-green-600':''}`}  onClick={()=> setSelectPayment(index)}>
            <div className="relative w-10 h-10 mx-auto">
              <Image
                src={item.images}
                alt={item.name}
                layout="fill"
                objectFit="contain" 
                className="rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
