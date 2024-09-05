"use client";

import { currency, subTotal } from "../../utils/currency";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getComanda } from "../../server";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-10">
      <div className="w-10 h-10 border-4 border-black border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default function Home() {
  const [comanda, setComanda] = useState({records:[]});
  const [isloading, setIsLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    getComanda(id)
      .then((response) => {
        setComanda(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return !isloading ? (
    <main className="flex h-screen flex-col ">
      <div className="fixed inset-x-0 top-0 w-full z-50 pt-2 shadow-sm bg-gray-100 ">
        <div className="flex w-full justify-center shadow-md">
          <div className="flex col-span-6 justify-center">
            <p className=" pb-2">
              <strong>Comanda</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 px-2">
          <div className="col-span-2 pt-3">
            <div className="flex justify-center items-center text-6xl h-20 border-solid rounded border-2">
              75
            </div>
          </div>
          <div
            className="col-span-3 pt-3"
            onClick={() => setExibirListaCompleta(true)}
          >
            <div className="flex h-20 border-solid rounded border-2 bg-gray-300">
              <div className="flex w-full flex-col p-2 justify-start">
                <p className="text-xs">
                  <strong>Informações</strong>
                </p>
                <div className="text-xs pt-2">Aberta: 10:20</div>
                <div className="text-xs">Atualização: 01:30</div>
              </div>
            </div>
          </div>
          <div className="col-span-2 pt-3">
            <div className="flex justify-center items-center text-2xl h-20 border-solid rounded border-2">
              LOGO
            </div>
          </div>
        </div>
        <div className="grid grid-cols-8 mx-2 mt-3 gap-2 bg-black rounded border-b border-black">
          <div className="flex justify-center items-center col-span-1 h-10 text-white ">
            <strong>
              <p>Qtd</p>
            </strong>
          </div>
          <div className="flex items-center col-span-5 text-white">
            <strong>
              <p>Descrição</p>
            </strong>
          </div>
          <div className="flex items-center text-white ">
            <strong>
              <p>Valor</p>
            </strong>
          </div>
        </div>
      </div>
      <div className="mt-10"></div>

      <div className="grid grid-cols-1 mt-36 pb-20 mx-2 ">
        {comanda.records.map((item) => (
          <div key={item.id} className="grid grid-cols-8 border-2 backdrop-blur-sm border-l-black border-l-4 rounded-md shadow-lg mt-2">
            <div className="flex items-center justify-center col-span-1 h-10">
              <p>{item.quant}</p>
            </div>
            <div className="flex items-center col-span-5">
              <p>{item.name}</p>
            </div>
            <div className="flex items-center col-span-2 ">
              <p>{currency(item?.price)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 w-full pt-2 px-2 pb-4 bg-gray-100 shadow-sm z-[99]">
        <div className="flex flex-row justify-end ">
          <div className=" flex flex-row rounded bg-black p-2">
            <div className="mr-2 text-3xl text-white">
              <strong>
                <p>SUBTOTAL:</p>
              </strong>
            </div>
            <div className="min-w-20 text-3xl text-white shadow-lg">
              <strong>{currency(subTotal(comanda.records))}</strong>
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <main className="flex h-screen flex-col justify-center ">
      <Loading />
    </main>
  );
}
