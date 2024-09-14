"use client";

import { useRef, useState } from "react";
import { currency, subTotal } from "../utils/currency";
import { Loading } from "../components/Loading";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { getComanda } from "../server";
import { AntSwitch } from "../components/AntSwitch";

const troco = (valorRecebido, subTotal) => {
  const result = !valorRecebido ? 0 : valorRecebido - subTotal;
  return currency(result);
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comanda, setComanda] = useState({records:[]});
  const [numComanda, setNumComanda] = useState("")
  const [valorRecebido, setValorRecebido] = useState("");
  const [isLoadingFinalizarComanda, setIsLoadingFinalizarComanda] = useState(false);
  const [hideTroco, setHideTroco] = useState(false);
  const [value, setValue] = useState("");
  const refInputValue = useRef();
  const timerRef = useRef(null);

  const onChangeMascValue = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const formattedValue = inputValue / 100;
    setValue(currency(formattedValue));

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log("Executando ação após 3 segundos de inatividade");
      setValorRecebido(formattedValue);
    }, 300);
  };


  const handleInputValue = () => {
    refInputValue.current.focus();
  };

  const handleGetComanda = () => {
    getComanda(numComanda).then((response) => {
      setComanda(response);
    });
  };

  console.log(comanda)
  return (
    <main className="flex min-h-screen flex-col justify-center px-40">
      <div className="grid grid-cols-12 min-w-[1150px]">
        <div className="col-span-4 bg-white/80  rounded-lg shadow-lg border-slate-300 border-2">
          <button
            className="px-4 h-10 w-full py-2 rounded text-white bg-slate-950 border-inherit shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            {isLoadingFinalizarComanda ? <Loading /> : "Carregar comanda"}
          </button>
        </div>
        <div className="col-span-8"></div>
      </div>
      <div className="grid grid-cols-12 mb-2 ml-4 min-w-[1150px]">
        <div className="col-span-8 "></div>
        <div className="col-span-4 flex"></div>
      </div>
      <div className="mb-2 pb-2 bg-white/80 rounded-lg min-w-[1150px] border-slate-300 border-2 shadow-lg ">
        <div className="bg-black rounded-t-lg pl-2 pr-5  backdrop-blur-sm">
          <div className="grid grid-cols-12 text-3xl py-2  text-white ">
            <div className="col-span-1 flex justify-center">
              <strong>Qtd</strong>
            </div>
            <div className="col-span-9 border-l-2  border-white pl-5 ">
              <strong>Descrição</strong>
            </div>
            <div className="col-span-2 border-l-2  border-white pl-5 ">
              <strong>Valor</strong>
            </div>
          </div>
        </div>
        <div className={`flex flex-col overflow-y-auto h-[400px]`}>
          {comanda.records?.map((item = []) => {
            return (
              <div
                key={item.id}
                className="grid grid-cols-12 text-2xl  border-l-[5px]  backdrop-blur-sm border-l-slate-900 border-white border-2 shadow-lg my-1 py-1 rounded-lg ml-2 mr-1"
              >
                <div className="col-span-1 flex justify-center py-4">
                  <strong> {item.quant}</strong>
                </div>
                <div className="col-span-9 pl-3 flex items-center">
                <strong>{item.name}</strong>
                </div>
                <div className="flex items-center col-span-2 pl-4 border-l-2 ">
                  <strong> {currency(item.price)}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 text-3xl mb-2 min-w-[1150px]">
        <div className="col-span-8"></div>
        <div className="col-span-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-slate-300 border-2">
          <div className="">
            <div className="flex gap-2 pl-2 py-1 items-center justify-between w-full text-white bg-black text-xs rounded-t-lg">
              <div className="flex items-center ">
                <MonetizationOnIcon
                  sx={{ height: "20px", width: "20px" }}
                  fontSize="medium"
                />
                <strong className="pl-2">
                  <p>SUBTOTAL </p>
                </strong>
              </div>
              <div className="mr-2">
                <AntSwitch setValue={setHideTroco} value={hideTroco} />
              </div>
            </div>
            <div className="">
              <div className="flex justify-end items-center text-4xl col-span-9 p-1">
                <strong>{currency(subTotal(comanda.records))}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hideTroco && (
        <div className="grid grid-cols-12 gap-2 text-3xl mb-2 min-w-[1150px]">
          <div className="col-span-8"></div>
          <div className="col-span-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-slate-300 border-2">
            <div className="">
              <div
                className="flex gap-2 pl-2 py-1 items-center w-full text-white bg-black text-xs rounded-t-lg"
                onClick={() => handleInputValue()}
              >
                <MonetizationOnIcon
                  sx={{ height: "20px", width: "20px" }}
                  fontSize="medium"
                />
                <strong>
                  <p>TOTAL RECEBIDO </p>
                </strong>
              </div>
              <div className="grid ">
                <div className="flex gap-1 justify-end items-center text-3xl col-span-9">
                  <input
                    ref={refInputValue}
                    value={value}
                    placeholder="R$ 0,00"
                    className="w-[100%] pr-1 border-0 rounded-lg font-bold text-right border-b focus:border-slate-200 focus:outline-none"
                    onChange={onChangeMascValue}
                    type="num"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white/80 backdrop-blur-sm rounded-lg  shadow-lg border-slate-300 border-2">
            <div className="">
              <div className="flex flex-row gap-2 pl-2 py-1 items-center  w-full text-white bg-black text-xs rounded-t-lg">
                <MonetizationOnIcon
                  sx={{ height: "20px", width: "20px" }}
                  fontSize="medium"
                />
                <strong>
                  <p>TROCO </p>
                </strong>
              </div>
              <div className="">
                <div className="flex justify-end items-center text-3xl col-span-9 pr-1">
                  <strong>{troco(valorRecebido, subTotal(comanda.records))}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-12 gap-2 mb-2 min-w-[1150px]">
        <div className="col-span-8"></div>
        <div className="col-span-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-slate-300 border-2">
          <button
            className={`px-4 h-10 w-full py-2 rounded text-white ${
              isLoadingFinalizarComanda && "cursor-not-allowed"
            } 
              ${
                !valorRecebido && hideTroco != false
                  ? "bg-gray-400 cursor-not-allowed "
                  : "bg-slate-950 border-inherit shadow-lg"
              }`}
            disabled={!valorRecebido && hideTroco != false}
            onClick={() => console.log("osasopdkasdp")}
          >
            {isLoadingFinalizarComanda ? <Loading /> : "FINALIZAR COMANDA"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div
          id="modal"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Insira o numero da comanda
            </h2>
            <div className="m-2">
            <input
              placeholder="Numero da comanda"
              className="w-[100%] pr-1 h-10 border-2 rounded-md pl-2"
              onChange={(e) => setNumComanda(e.target.value)}
              type="num"
            />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleGetComanda();
                }}
                className="px-4 py-2 bg-slate-950 border-inherit shadow-lg text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
