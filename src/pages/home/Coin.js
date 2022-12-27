import React, { useState } from "react";

const Coin = ({ value, setValue, done }) => {
  const [number, setNumber] = useState(0);
  const [isSelected, setIsSeleted] = useState(false);

  //set values
  const selectThisValue = () => {
    // use only 1 and 2 values coins
    const num = Math.floor(Math.random() * 2) + 1;
    setValue(value + num);
    setNumber(num);
    setIsSeleted(true);
  };

  return (
    <>
      <button
        className={`w-12 h-12 rounded-md shadow-md m-2 flex items-center justify-center font-semibold ${
          isSelected || done ? "bg-green-300" : "bg-blue-400"
        }`}
        disabled={isSelected || done}
        onClick={selectThisValue}
      >
        {number ? number : null}
      </button>
    </>
  );
};

export default Coin;
