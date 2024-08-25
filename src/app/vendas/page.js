"use client";
import currency from "../utils/currency";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { Quantidade } from "../components/organismo/Quantidade";
import { testServer, getListItems } from "../server";

const total = (items) => {
  const totalPrice = items.reduce((acc, current) => acc + current.price, 0);
  return currency(totalPrice);
};

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

const serializaItem = (item) => {
  const num = item.quant.toString().padStart(2, "0");
  const text = `${num} - ${item.label}`;
  return text;
};

const handleAdicionaItem = async (
  item,
  quant,
  listItens,
  setListItens,
  setIsModalOpen,
  setLastClickTime,
  lastClickTime,
  setIsLoadingAddItem,
  inputDetails,
  isLoadingAddIte,
  modal = false
) => {
  if (isLoadingAddIte) {
    return;
  }

  const ultimoItem = listItens[listItens.length - 1];
  const currentTime = new Date();
  const obj = {
    ...item,
    quant,
  };

  if(inputDetails.trim() !== ""){
    obj.details = inputDetails
  }

  if (ultimoItem?.id === obj?.id && !modal) {
    const timeDifference = (currentTime - lastClickTime) / 1000;
    if (timeDifference < 30) {
      setIsModalOpen(true);
      return listItens;
    }
  }

  setIsLoadingAddItem(true);
  await testServer("testando").then((resp) => {
    console.log(resp);
  });
  setIsLoadingAddItem(false);

  setListItens((prevList) => {
    return [...prevList, obj];
  });
  setLastClickTime(currentTime);
};

const Loading = () => {
  return (
    <div class="flex justify-center items-center min-h-screen">
      <div class="w-4 h-4 border-2 border-gray-100 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default function Home() {
  const [listaSelecaoItems, setListaSelecaoItems] = useState([])
  const [lastClickTime, setLastClickTime] = useState(null);
  const [value, setValue] = useState("");
  const [inputDetails, setInputDetails] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [exibirListaCompleta, setExibirListaCompleta] = useState(false);
  const [listDeItensAdicionados, setListDeItensAdicionados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingAddItem, setIsLoadingAddItem] = useState(false);

  useEffect( () => async () => {{
      const items = await getListItems()
      setListaSelecaoItems(items)
    }},[])

  return !exibirListaCompleta ? (
    <main className="flex h-screen flex-col bg-gray-100">
      <div className="flex flex-col p-2 gap-4">
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-2">
            <p className="text-xs">
              <strong>Comanda</strong>
            </p>
            <div className="flex justify-center items-center text-6xl h-20 border-solid rounded border-2">
              75
            </div>
          </div>
          <div
            className="col-span-5"
            onClick={() => setExibirListaCompleta(true)}
          >
            <p className="text-xs">
              <strong>Ultimos itens adicionados</strong>
            </p>
            <div className="flex h-20 border-solid rounded border-2 bg-gray-300">
              <div className="flex w-full flex-col pl-2 justify-end">
                {listDeItensAdicionados.slice(-3).map((item) => (
                  <p className="w-full truncate">{serializaItem(item)}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Autocomplete
            value={value}
            disablePortal
            onChange={(event, newValue) => {
              setValue(newValue);
              setQuantidade(1);
              setInputDetails('')
            }}
            disabled={!listaSelecaoItems.length}
            id="combo-box-demo"
            options={listaSelecaoItems}
            renderInput={(params) => (
              <TextField {...params} label={ !listaSelecaoItems.length ? "Carregando items..." : "Selecione um item"} />
            )}
          />
        </div>
        <Quantidade
          value={value}
          setQuantidade={setQuantidade}
          quantidade={quantidade}
        />
        <TextField
          id="outlined-multiline-flexible"
          label={!(value && quantidade) ? '' : 'Adicione um comentario' }
          value={inputDetails}
          onChange={(event) => {
            setInputDetails(event.target.value);
          }}
          disabled={!(value && quantidade)}
          InputProps={{
            endAdornment: (
              !!inputDetails.length && <IconButton>
                  <CloseIcon sx={{ color: 'grey' }}  onClick={() => setInputDetails('')} />
                </IconButton>
            ),
          }}
        />
        <div className="flex flex-1 h-20">
          <Button
            sx={{
              height: "56px",
              width: "100%",
            }} 
            variant="contained"
            disabled={!(value && quantidade)}
            startIcon={isLoadingAddItem ? <Loading /> : null}
            onClick={() =>
              handleAdicionaItem(
                value,
                quantidade,
                listDeItensAdicionados,
                setListDeItensAdicionados,
                setIsModalOpen,
                setLastClickTime,
                lastClickTime,
                setIsLoadingAddItem,
                inputDetails,
                isLoadingAddItem
              )
            }
          >
            {isLoadingAddItem ? "" : "Adicionar Item"}
          </Button>
        </div>
      </div>
      <a onClick={() => toggleFullScreen()}>full navegador</a>
      {isModalOpen && (
        <div
          id="modal"
          class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 class="text-xl font-semibold mb-4">Item adicionado recentemente</h2>
            <p class="mb-4">Tem certeza que deseja adicionar o item?</p>
            <div class="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                class="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleAdicionaItem(
                    value,
                    quantidade,
                    listDeItensAdicionados,
                    setListDeItensAdicionados,
                    setIsModalOpen,
                    setLastClickTime,
                    lastClickTime,
                    setIsLoadingAddItem,
                    inputDetails,
                    isLoadingAddItem,
                    true
                  );
                }}
                class="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  ) : (
    <main className="flex h-screen flex-col bg-gray-100">
      <div className="flex flex-col p-2 ">
        <div className="flex flex-col gap-4">
        <div
          className="grid grid-cols-3 gap-4"
          onClick={() => setExibirListaCompleta(false)}
        >
          <div className="">
            <p className="text-xs">Comanda</p>
            <div className="flex justify-center items-center text-6xl h-20 border-solid rounded border-2">
              75
            </div>
          </div>
          <div className="">
            <p className="text-xs">Comanda</p>
            <div className="flex justify-center items-center text-6xl h-20 border-solid rounded border-2">
              75
            </div>
          </div>
          <div className="">
            <p className="text-xs">Comanda</p>
            <div className="flex justify-center items-center text-6xl h-20 border-solid rounded border-2">
              75
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1  gap-1">
          <div className=" grid grid-cols-8  gap-4 bg-gray-300 rounded">
            <div className="flex justify-center items-center col-span-1 h-10 ">
              <strong>
                <p>Qtd</p>
              </strong>
            </div>
            <div className="flex items-center col-span-5">
              <strong>
                <p>Descrição</p>
              </strong>
            </div>
            <div className="flex items-center">
              <strong>
                <p>Valor</p>
              </strong>
            </div>
          </div>
          {listDeItensAdicionados.map((item) => (
            <div className="grid grid-cols-8 gap-4 bg-gray-200 ">
              <div className="flex items-center justify-center col-span-1 h-10">
                <p>{item.quant}</p>
              </div>
              <div className="flex items-center col-span-5">
                <p>{item.label}</p>
              </div>
              <div className="flex items-center col-span-2">
                <p>{currency(item.price)}</p>
              </div>
            </div>
          ))}
          <div className="flex flex-row justify-end ">
            <div className=" flex flex-row rounded bg-gray-300 p-2">
              <div className="mr-2 text-3xl">
                <strong>
                  <p>TOTAL:</p>
                </strong>
              </div>
              <div className="min-w-20 text-3xl">
                <strong>{total(listDeItensAdicionados)}</strong>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
