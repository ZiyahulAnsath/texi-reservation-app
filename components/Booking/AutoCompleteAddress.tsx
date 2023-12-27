import React from "react";

const AutoCompleteAddress = () => {
  return (
    <div>
      <div>
        <label className="text-gray-500">Where from?</label>
        <input
          type="text"
          name="from"
          className="focus:bg-slate-100 p-1 w-full rounded-md border-[1px] outline-none"
        />
      </div>
      <div className="mt-4">
        <label className="text-gray-500">Where To?</label>
        <input
          type="text"
          name="to"
          className="focus:bg-slate-100 p-1 w-full rounded-md border-[1px] outline-none"
        />
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
