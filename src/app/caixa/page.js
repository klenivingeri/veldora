"use client"

import Image from "next/image";
import { Cards } from "../components/organismo/Cards";

export default function Home() {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(
          `Erro ao tentar entrar em tela cheia: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <main className="flex min-h-screen flex-col  md:p-24">
       <div className="w-full">
        <Cards />
       </div>
       <div className="size-full">
       aaaaaaa
       
       </div>
       
    </main>
  );
}