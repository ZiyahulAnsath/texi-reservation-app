'use client'
import CarList from '@/data/CarList'
import Image from 'next/image'
import { useState } from 'react'

const Cars = () => {
    const [selectedCar, setSelectedCar] = useState<any>();

    console.log(selectedCar);
    
  return (
    <div className="mt-3">
        <h2 className="text-[14px] font-medium">Select Vehicle</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 mt-4 cursor-pointer">
        {CarList.map((item,index)=>(
            <div key={index} className={`m-2 p-2 border-[1px] rounded-md hover:border-blue-600  ${index==selectedCar?' border-blue-600 border-[2px]':''}`} onClick={()=> setSelectedCar(index)}>
                <Image src={item.images} alt={item.name} width={50} height={70} className=' hover:text-green-500 w-full'/>
                <h2 className='text-[12px] font-semibold text-gray-500'>{item.name} <span className=' text-blue-700 font-bold float-right'>{item.charges*8} LKR</span></h2>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Cars