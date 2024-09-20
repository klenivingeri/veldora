"use client"

import { CantosBot } from "../components/Cantos";
import { MenuInferior } from "../components/MenuInferior";
import { useState } from "react"; 
import { Loading } from "../components/Loading";

export default function Perfil() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div class="flex flex-col h-screen">
      <div
        id="Top-Flutuante"
        className="fixed inset-x-0 top-0 h-[100px] w-full white z-50"
      >
        Top-Flutuante
      </div>

      <div
        id="Bot-Flutuante"
        className="fixed inset-x-0 bottom-0 w-full h-[60px]  z-50"
      >
        <div className="w-full px-[20px] pb-[8px]">
        </div>
          <div className="relative">
          <CantosBot />
          </div>
        <div className="bg-black h-full">
          <MenuInferior page='Perfil' />
        </div>
      </div>

      <div class="flex-grow bg-slate-100 py-[100px]">
      {isLoading ? (
        <div className="flex-grow  h-full flex justify-center items-center ">
        <Loading color="black" />
        </div>
      ) : (
        <div>
        <p>aaaaaaaaaaaaaaaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
        </div>
      )}
      </div>
    </div>
  );
}
