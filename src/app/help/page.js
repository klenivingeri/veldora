"use client"

import { useState } from "react"; 
import { Loading } from "../components/Loading";

export default function Help() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div class="flex flex-col h-screen">
      <div
        id="Top-Flutuante"
        className="fixed inset-x-0 top-0 h-[100px] w-full bg-gray-400 z-50"
      >
        Top-Flutuante
      </div>

      <div
        id="Bot-Flutuante"
        className="fixed inset-x-0 bottom-0 w-full h-[100px] bg-gray-400 z-50"
      >
        Bot-Flutuante
      </div>

      <div class="flex-grow bg-gray-300 py-[100px]">
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
