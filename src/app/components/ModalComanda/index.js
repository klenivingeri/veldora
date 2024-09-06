import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";

import { Loading } from "../Loading";
import { getAllComandas } from "../../server";
import { Modal } from "../Modal";

export const ModalComanda = ({ setModal, getComanda, postCreateComanda }) => {
  const [comandas, setComandas] = useState({on:[], off:[]});
  const [numComandaOn, setNumComandaOn] = useState("");
  const [numComandaOff, setNumComandaOff] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [hideKeyboard, setHideKeyboard] = useState(false);

  const handleScroll = (event) => {
    setHideKeyboard(true)
  };

  const handleNumComanda = (type, value) => {
    if(type === 'on'){
      setNumComandaOn(value)
    }else {
      setNumComandaOff(value)
    }
  }
  
  useEffect(() => {
    getAllComandas()
      .then((response) => {
        setComandas(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  return (
    <Modal setModal={setModal} position="">
      {isLoading ? (
        <Loading color="black" />
      ) : (
        <div className="flex gap-2 flex-col">
          <div className="flex  gap-2 flex-row">
            <div className="flex flex-1 flex-col w-full gap-2 border-2 border-gray-300 rounded-md p-2">
              <Autocomplete
                sx={{
                  width: "100%",
                }}
                freeSolo
                onChange={(event, newEvent) => {
                  handleNumComanda('on',newEvent.label)
                  setNumComandaOff
                }}
                noOptionsText="sem opção"
                id="free-solo-2-demo"
                options={comandas.on}
                disableClearable
                ListboxProps={{
                  onScroll: handleScroll
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Comandas ativas"
                    onChange={(event,) => {
                      handleNumComanda('on',event.target.value)
                    }}
                    onClick={() => {
                      setHideKeyboard(false)
                      setNumComandaOff("")
                    }}
                    inputProps={{
                      ...params.inputProps,
                      inputMode: "numeric",
                      type: "search",
                      autoComplete: "off",
                      autoCorrect: "off",
                      autoCapitalize: "off",
                      spellCheck: "false",
                      readOnly: hideKeyboard
                    }}
                  />
                )}
              />
              <button
                onClick={() => {
                  getComanda(numComandaOn)
                  setModal(false);
                }}
                className={`px-4 py-2 w-full border-inherit shadow-lg text-white rounded ${
                  !numComandaOn
                  ? "bg-gray-400 cursor-not-allowed "
                  : "bg-slate-950 border-inherit shadow-lg"
                }`}
              >
                Carregar
              </button>
            </div>
            <div className="flex flex-1 flex-col w-full gap-2 border-2 border-gray-300 rounded-md p-2">
              <Autocomplete
                sx={{
                  width: "100%",
                }}
                freeSolo
                id="free-solo-2-demo"
                options={comandas.off}
                onChange={(event, newEvent) => {
                  handleNumComanda('off',newEvent.label)
                }}
                disableClearable
                ListboxProps={{
                  onScroll: handleScroll
                }}
                noOptionsText="Não existe"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Inserir comanda"
                    onChange={(event) => {
                      handleNumComanda('off',event.target.value)
                    }}
                    onClick={() => {
                      setHideKeyboard(false)
                      setNumComandaOn("")
                    }}
                    inputProps={{
                      ...params.inputProps,
                      inputMode: "numeric",
                      type: "search",
                      autoComplete: "off",
                      autoCorrect: "off",
                      autoCapitalize: "off",
                      spellCheck: "false",
                      readOnly: hideKeyboard
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        postCreateComanda(numComandaOff)
                        setModal(false);
                      }
                    }}
                  />
                )}
              />
              <button
                onClick={() => {
                  postCreateComanda(numComandaOff)
                  setModal(false);
                }}
                className={`px-4 py-2 w-full border-inherit shadow-lg text-white rounded ${
                  !numComandaOff
                  ? "bg-gray-400 cursor-not-allowed "
                  : "bg-slate-950 border-inherit shadow-lg"
                }`}
              >
                Criar
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setModal(false);
            }}
            className="px-4 py-2 w-full bg-red-400 border-inherit shadow-lg text-white rounded"
          >
            FECHAR
          </button>
        </div>
      )}
    </Modal>
  );
};
