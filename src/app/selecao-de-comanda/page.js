"use client";

import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Loading } from "../components/Loading";
import { getAllComandas } from "../server";
import Link from "next/link";
import { ButtonComanda } from "../components/ButtomComanda";

const back = () => {
  window.history.back();
};

export default function SelecaoDeComanda({}) {
  const [comandas, setComandas] = useState({ on: [], off: [] });
  const [modalCreate, setModalCreate] = useState("");
  const [numComandaOff, setNumComandaOff] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalComanda, setModalComanda] = useState(false);

  const [hideKeyboard, setHideKeyboard] = useState(false);

  const handleScroll = (event) => {
    setHideKeyboard(true);
  };

  const handleNumComanda = (value) => {
    setNumComandaOff(value);
  };

  useEffect(() => {
    getAllComandas()
      .then((response) => {
        setComandas(response);
      })
      .finally(() => {
        window.scrollTo(0, 0);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <title>Anottai - Comandas</title>
      <div className="flex flex-col h-screen">
        <div
          id="Top-Flutuante"
          className="fixed inset-x-0 top-0 h-[140px] w-full z-50 bg-white shadow-lg"
        >
          <div className="flex w-full flex-row  h-[45px]">
            <div
              className="flex  h-full justify-center items-center w-[60px] "
              onClick={() => back()}
            >
              <ArrowBackIosNewIcon />
            </div>
            <div className="flex h-full w-full justify-center items-center">
              <strong className="pr-[80px]">Comandas</strong>
            </div>
          </div>
          <div className="flex h-full flex-col gap-2 p-2">
            <div className="">
              <div
                id="Nova-Comanda"
                className="flex flex-1 flex-row w-full p-2 gap-2 border-2 border-gray-300 rounded-md"
              >
                <Autocomplete
                  sx={{
                    width: "100%",
                    background: "white",
                  }}
                  freeSolo
                  id="free-solo-2-demo"
                  options={comandas.off}
                  onChange={(event, newEvent) => {
                    handleNumComanda(newEvent.label);
                  }}
                  disableClearable
                  ListboxProps={{
                    onScroll: handleScroll,
                  }}
                  noOptionsText="Não existe"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={isLoading ? "Carregando..." : "Nova comanda"}
                      onChange={(event) => {
                        handleNumComanda(event.target.value);
                      }}
                      onClick={() => {
                        setHideKeyboard(false);
                      }}
                      inputProps={{
                        ...params.inputProps,
                        inputMode: "numeric",
                        type: "search",
                        autoComplete: "off",
                        autoCorrect: "off",
                        autoCapitalize: "off",
                        spellCheck: "false",
                        readOnly: hideKeyboard,
                      }}
                    />
                  )}
                />
                <button
                  onClick={() => setModalCreate(true)}
                  className={`px-4 flex py-2 items-center justify-center w-full border-inherit shadow-lg text-white rounded ${
                    !numComandaOff
                      ? "bg-gray-400 cursor-not-allowed "
                      : "bg-slate-950 border-inherit shadow-lg"
                  }`}
                >
                  Criar
                </button>
              </div>
            </div>
            <div className="flex h-full items-end ">
              <div className="flex w-full bg-black justify-center rounded-t-md p-2 shadow-lg">
                <p className="text-white">
                  <strong>Comandas Ativas</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="MID" className="flex-grow pt-[175px] pb-[100px]">
          {isLoading ? (
            <div className="flex-grow  h-full flex justify-center items-center ">
              <Loading color="black" />
            </div>
          ) : (
            <div className="grid grid-cols-6 flex-col">
              {comandas.on.map((comanda) => <ButtonComanda comanda={comanda} setModalComanda={setModalComanda} />)}
            </div>
          )}
        </div>
      </div>
      {modalComanda && (
        <div
          id="modal"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Informações da Comanda
            </h2>
            <p className="mb-4">...</p>

            
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalComanda(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() =>{}}
                className="px-4 py-2 bg-slate-950 border-inherit shadow-lg text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {modalCreate && (
        <div
          id="modal"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Criar Comanda
            </h2>
            <p className="mb-4">...</p>

            
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalCreate(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancelar
              </button>
              <Link
                href={`/vendas?postComanda=${numComandaOff}`}
                className="px-4 py-2 bg-slate-950 border-inherit shadow-lg text-white rounded"
              >
                Confirmar
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
