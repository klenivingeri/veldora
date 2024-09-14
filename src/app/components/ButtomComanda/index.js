import { useState } from "react";
import Link from "next/link";

export const ButtonComanda = ({comanda, setModalComanda}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <a
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`col-span-2 bg-white h-[65px] m-2 border-2 border-black shadow-lg rounded-lg backdrop-blur-sm relative focus:bg-black
                  ${!isTouched ? "border-r-4 border-b-4" : ""}`}
    >
      <div className="absolute top-[10px] left-[10px] h-[10px] w-[10px] bg-green-500 rounded-full"></div>
      <div className="flex justify-center h-full content-center items-center">
        <Link href={`/vendas2?orderid=${comanda.label}`} className="text-xl">
          <strong>{comanda.label}</strong>
        </Link>
      </div>
      <div
        onClick={() => setModalComanda(true)}
        className="absolute top-[10px] right-[5px] h-[10px] w-[10px] rounded-full"
      >
        <div className="flex flex-col gap-1">
          <div className="rounded-full bg-black h-[4px]  w-[4px]"></div>
          <div className="rounded-full bg-black h-[4px]  w-[4px]"></div>
          <div className="rounded-full bg-black h-[4px]  w-[4px]"></div>
        </div>
      </div>
    </a>
  );
};
