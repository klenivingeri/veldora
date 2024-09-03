"use client";

import { useEffect, useRef, useState } from "react";
import { currency, subTotal } from "../utils/currency";
import { Loading } from "../components/Loading";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { getComanda } from "../server";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#cccccc",
        ...theme.applyStyles("dark", {
          backgroundColor: "#cccccc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));

const troco = (valorRecebido, subTotal) => {
  const result = !valorRecebido ? 0 : valorRecebido - subTotal;
  return currency(result);
};

export default function Home() {
  const [comanda, setComanda] = useState([]);
  const [valorRecebido, setValorRecebido] = useState("");
  const [isLoadingFinalizarComanda, setIsLoadingFinalizarComanda] =
    useState(false);
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
    }, 500);
  };

  useEffect(() => {
    getComanda().then((response) => {
      setComanda(response);
    });
  }, []);

  const handleInputValue = () => {
    refInputValue.current.focus();
  };

  return (
    <main className="flex min-h-screen flex-col justify-center px-40">
      <div className="mt-2 mb-2 pb-2 bg-white/80 backdrop-blur-sm rounded-lg min-w-[1150px] border-slate-300 border-2 shadow-lg ">
        <div className="bg-black rounded-t-lg pl-2 pr-5">
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
          {comanda?.map((item = []) => {
            return (
              <div
                key={item.id}
                className="grid grid-cols-12 text-2xl  border-l-[5px] border-l-slate-900 border-slate-100 shadow-md my-1 py-1 rounded-lg ml-2 mr-1"
              >
                <div className="col-span-1 flex justify-center py-4">
                 <strong> {item.quant}</strong>
                </div>
                <div className="col-span-9 pl-5 border-l-2 border-black py-4">
                  {item.name}
                </div>
                <div className="col-span-2 pl-4 border-l-2 border-black py-3">
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
                <AntSwitch onChange={() => setHideTroco(!hideTroco)} />
              </div>
            </div>
            <div className="">
              <div className="flex justify-end items-center text-4xl col-span-9 p-1">
                <strong>{currency(subTotal(comanda))}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hideTroco &&(<div className="grid grid-cols-12 gap-2 text-3xl mb-2 min-w-[1150px]">
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
                <strong>{troco(valorRecebido, subTotal(comanda))}</strong>
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
            onClick={()=> console.log('osasopdkasdp')}
          >
            {isLoadingFinalizarComanda ? <Loading /> : "FINALIZAR COMANDA"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 mb-2 ml-4 min-w-[1150px]">
        <div className="col-span-8 "></div>
        <div className="col-span-4 flex">
          
        </div>
      </div>
    </main>
  );
}
