import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";
import Popper from "@mui/material/Popper";
import { Loading } from "../Loading";
import { getAllComandas } from "../../server";
import { Modal } from "../Modal";

export const ModalComanda = ({ setModal, getComanda, postCreateComanda }) => {
  const [comandas, setComandas] = useState({});
  const [numComandaOn, setNumComandaOn] = useState("");
  const [numComandaOff, setNumComandaOff] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    <Modal setModal={setModal} position="inset-x-0 top-0">
      {isLoading ? (
        <Loading color="black" />
      ) : (
        <div className="flex gap-2 flex-col">
          <div className="flex flex-1 w-full gap-2 border-2 border-gray-300 rounded-md p-2">
            <Autocomplete
              sx={{
                width: "100%",
              }}
              onChange={(event, newEvent) => {
                handleNumComanda('on',newEvent.label)
              }}
              freeSolo
              id="free-solo-2-demo"
              options={comandas?.filter((c) => {
                return c.active ? c.label : null;
              })}
              PopperComponent={(props) => (
                <Popper
                  {...props}
                  style={{
                    width: props.anchorEl
                      ? props.anchorEl.clientWidth
                      : undefined, // Define a largura do Popper igual à do input
                    maxHeight: 200,
                    overflowY: "auto",
                  }}
                />
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Comandas ativas"
                  onChange={(event, newEvent) => {
                    handleNumComanda('on',newEvent.label)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      getComanda(numComandaOn)
                      setModal(false);
                    }
                  }}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                      inputMode: 'numeric'
                    },
                  }}
                />
              )}
            />
            <button
              onClick={() => {
                getComanda(numComandaOn)
                setModal(false);
              }}
              className="px-4 py-2 w-full bg-slate-950 border-inherit shadow-lg text-white rounded"
            >
              Carregar
            </button>
          </div>
          <div className="flex flex-1 w-full gap-2 border-2 border-gray-300 rounded-md p-2">
            <Autocomplete
              sx={{
                width: "100%",
              }}
              freeSolo
              id="free-solo-2-demo"
              options={comandas?.filter((c) => {
                return !c.active ? c.label : null;
              })}
              onChange={(event, newEvent) => {
                handleNumComanda('off',newEvent.label)
              }}
              PopperComponent={(props) => (
                <Popper
                  {...props}
                  style={{
                    width: props.anchorEl
                      ? props.anchorEl.clientWidth
                      : undefined, // Define a largura do Popper igual à do input
                    maxHeight: 200,
                    overflowY: "auto",
                  }}
                />
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Inserir comanda"
                  onChange={(event, newEvent) => {
                    handleNumComanda('off',newEvent.label)
                  }}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
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
              className="px-4 py-2 w-full bg-slate-950 border-inherit shadow-lg text-white rounded"
            >
              Criar
            </button>
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
