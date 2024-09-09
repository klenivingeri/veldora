"use client";

import QRCode from "react-qr-code";
import { currency, subTotal } from "../utils/currency";
import { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PinIcon from "@mui/icons-material/Pin";
import { Quantidade } from "../components/organismo/Quantidade";
import { Loading } from "../components/Loading";
import { ModalComanda } from "../components/ModalComanda";
import { testServer, getListItems, getComanda, postComanda } from "../server";
import Link from "next/link";

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
  const num = item?.quant.toString().padStart(2, "0");
  const text = `${num} - ${item?.name}`;
  return text;
};

const handleAdicionaItem = async (
  item,
  setValue,
  quant,
  setQuantidade,
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

  if (inputDetails.trim() !== "") {
    obj.details = inputDetails;
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
  setValue("");
  setQuantidade(0);

  setListItens((prevList) => {
    return { ...prevList, records: [...prevList.records, obj] };
  });
  setLastClickTime(currentTime);
};

export default function Home({searchParams}) {
  const getComandaParams = searchParams.getComanda;
  const postComandaParams = searchParams.postComanda;
  const [listaSelecaoItems, setListaSelecaoItems] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [value, setValue] = useState("");
  const [inputDetails, setInputDetails] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [exibirListaCompleta, setExibirListaCompleta] = useState(false);
  const [listDeItensAdicionados, setListDeItensAdicionados] = useState({
    records: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalGetComandaOpen, setIsModalGetComandaOpen] = useState(false);
  const [isModalQRCodeOpen, setIsModalQRCodeOpen] = useState(false);
  const [isLoadingAddItem, setIsLoadingAddItem] = useState(false);
  const [isLoadingComanda, setIsLoadingComanda] = useState(false);
  const [description, setDescription] = useState(false);
  const [isTextKeyboard, setTextKeyboard] = useState(false);
  const [text, setText] = useState("");
  const [hideKeyboard, setHideKeyboard] = useState(false);


  const handleScroll = (event) => {
    setHideKeyboard(true)
  };

  const textFieldRef = useRef(null);
  const handleKeyboard = () => {
    setTextKeyboard(!isTextKeyboard);

    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const get = (params) => {
    setIsLoadingComanda(true);
    getComanda(params)
      .then((response) => {
        setListDeItensAdicionados(response);
      })
      .finally(() => {
        setIsLoadingComanda(false);
      });
  };

  const post = (params) => {
    setIsLoadingComanda(true);
    postComanda(params)
      .then((response) => {
        setListDeItensAdicionados(response);
      })
      .finally(() => {
        setIsLoadingComanda(false);
      });
  };

  useEffect(() => {
    if(getComandaParams){
      get(getComandaParams)
    }
   if(postComandaParams){
    post(postComandaParams)
   }
    getListItems().then((response) => {
      setListaSelecaoItems(response);
    });
  }, []);

  return !exibirListaCompleta ? (
    <main className="flex h-screen flex-col backdrop-blur-sm">
      <div className="flex w-full flex-col p-2 gap-4 ">
        <div className="grid grid-cols-7 gap-4 border border-gray-300 p-2 rounded">
          <div
            className="col-span-2"
          >
            <p className="text-xs"><strong>Comanda</strong></p>
            <Link 
            href="/selecao-de-comanda"
            className="flex justify-center items-center text-5xl h-15 min-h-[65px] border-black border-solid rounded border-2 shadow-lg">
              {isLoadingComanda ? (
                <Loading color="black" />
              ) : listDeItensAdicionados?.id ? (
                listDeItensAdicionados.id ? listDeItensAdicionados.id : "..."
              ) : (
                "..."
              )}
            </Link>
          </div>
          <div
            className="col-span-5"
            onClick={() => setExibirListaCompleta(true)}
          >
            <p className="text-xs"><strong>Ultimos itens adicionados</strong></p>
            <div className="flex h-15 border-solid rounded border-2 min-h-[65px] bg-slate-950 border-black shadow-lg ">
              <div className="flex w-full flex-col pl-2 justify-end ">
                {listDeItensAdicionados.records?.length && !isLoadingComanda ? (
                  listDeItensAdicionados.records.slice(-3).map((item) => (
                    <strong>
                      {" "}
                      <p
                        key={item.id}
                        className="w-full text-sm truncate text-white"
                      >
                        {serializaItem(item)}
                      </p>
                    </strong>
                  ))
                ) : (
                  <p className="w-full truncate text-white ">...</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-full">
            <Autocomplete
              value={value ? value : text}
              onChange={(event, newValue) => {
                if (newValue == null) {
                  setQuantidade(0);
                } else {
                  setQuantidade(1);
                }
                setValue(newValue);
                setInputDetails("");
                setDescription(false);
                setText("");
              }}
              disabled={!listaSelecaoItems.length}
              id="free-solo-2-demo"
              options={listaSelecaoItems}
              size="small"
              disableClearable
              ListboxProps={{
                onScroll: handleScroll
              }}
              noOptionsText="Nenhuma opção encontrada"
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={textFieldRef}
                  size="small"
                  label={
                    !listaSelecaoItems.length
                      ? "Carregando items..."
                      : "Selecione um item"
                  }
                  inputProps={{
                    ...params.inputProps,
                    inputMode: isTextKeyboard ? "numeric" : "text",
                    type: "search",
                    autoComplete: "off",
                    autoCorrect: "off",
                    autoCapitalize: "off",
                    spellCheck: "false",
                    readOnly: hideKeyboard
                  }}
                  onClick={() => setHideKeyboard(false)}
              
                />
              )}
            />
          </div>
          <div className="2">
            <button
              className="px-4 h-10 w-full py-2 bg-slate-950 text-white rounded"
              onClick={() => handleKeyboard()}
            >
              {isTextKeyboard ? <KeyboardIcon /> : <PinIcon />}
            </button>
          </div>
        </div>
        <Quantidade
          value={value}
          setQuantidade={setQuantidade}
          quantidade={quantidade}
        />

        <div className="flex w-full items-center">
          <div className={`ml-2 ${!description ? "w-full" : ""}`}>
            <FormControlLabel
              sx={{
                height: "40px",
                marginRight: "2px",
                width: "100%",
              }}
              size="small"
              control={<Switch />}
              onChange={() => setDescription(!description)}
              label={!description ? "Adicionar um comentário" : ""}
            />
          </div>
          <div className={`flex ${!description ? "" : "w-full"}`}>
            {description && (
              <TextField
                id="outlined-multiline-flexible"
                label="Click aqui para adicione um comentário"
                size="small"
                value={inputDetails}
                onChange={(event) => {
                  setInputDetails(event.target.value);
                }}
                sx={{
                  width: "100%",
                }}
                InputProps={{
                  endAdornment: !!inputDetails.length && (
                    <IconButton>
                      <CloseIcon
                        sx={{ color: "grey" }}
                        onClick={() => setInputDetails("")}
                      />
                    </IconButton>
                  ),
                }}
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 h-20">
          <button
            className={`px-4 h-10 w-full py-2 rounded text-white ${
              isLoadingAddItem && "cursor-not-allowed"
            } 
              ${
                !(value && quantidade)
                  ? "bg-gray-400 cursor-not-allowed "
                  : "bg-slate-950 border-inherit shadow-lg"
              }`}
            disabled={!(value && quantidade)}
            onClick={() =>
              handleAdicionaItem(
                value,
                setValue,
                quantidade,
                setQuantidade,
                listDeItensAdicionados.records,
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
            {isLoadingAddItem ? <Loading /> : "ADICIONAR ITEM"}
          </button>
        </div>
      </div>
      <a onClick={() => toggleFullScreen()}>full navegador</a>
      {isModalOpen && (
        <div
          id="modal"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">
              Item adicionado recentemente
            </h2>
            <p className="mb-4">Tem certeza que deseja adicionar o item?</p>
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
                  handleAdicionaItem(
                    value,
                    setValue,
                    quantidade,
                    setQuantidade,
                    listDeItensAdicionados.records,
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
                className="px-4 py-2 bg-slate-950 border-inherit shadow-lg text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalGetComandaOpen && (
        <ModalComanda
          setModal={setIsModalGetComandaOpen}
          getComanda={get}
          postCreateComanda={post}
        />
      )}
    </main>
  ) : (
    <main className="flex h-screen flex-col ">
      <div className="fixed inset-x-0 top-0 w-full z-50 pt-2 shadow-sm bg-gray-100 backdrop-blur-sm ">
        <div
          className="grid grid-cols-7 h-8 shadow-md"
          onClick={() => setExibirListaCompleta(false)}
        >
          <div className="col-span-1">
            <ArrowBackIosNewIcon />
          </div>
          <div className="flex col-span-6 justify-center">
            <p className="pr-10">
              <strong>Comanda</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 px-2">
          <div className="col-span-2 pt-3">
            <div className="flex justify-center items-center text-6xl h-20 rounded border-2 border-black">
              {isLoadingComanda ? (
                <Loading color="black" />
              ) : listDeItensAdicionados?.id ? (
                listDeItensAdicionados.id
              ) : (
                "..."
              )}
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
            <div
              className="flex justify-center items-center text-6xl h-20"
              onClick={() => setIsModalQRCodeOpen(!isModalQRCodeOpen)}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "75px", width: "75px" }}
                value={value}
                viewBox={`0 0 256 256`}
              />
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
        {listDeItensAdicionados.records.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-8 border-2 backdrop-blur-sm border-l-black border-l-4 rounded-md shadow-lg mt-2"
          >
            <div className="flex items-center justify-center col-span-1 h-10">
              <p>{item.quant}</p>
            </div>
            <div className="flex items-center col-span-5">
              <p>{item.name}</p>
            </div>
            <div className="flex items-center col-span-2 ">
              <p>{currency(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 w-full pt-2 px-2 pb-4 bg-gray-100 shadow-sm ">
        <div className="flex flex-row justify-end ">
          <div className=" flex flex-row rounded bg-black p-2">
            <div className="mr-2 text-3xl text-white">
              <strong>
                <p>SUBTOTAL:</p>
              </strong>
            </div>
            <div className="min-w-20 text-3xl text-white shadow-lg">
              <strong>
                {currency(subTotal(listDeItensAdicionados.records))}
              </strong>
            </div>
          </div>
        </div>
      </div>
      {isModalQRCodeOpen && (
        <div
          id="modal"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg  max-w-sm w-full">
            <div
              className="flex  justify-end p-3"
              onClick={() => setIsModalQRCodeOpen(!isModalQRCodeOpen)}
            >
              <div className=" rounded-lg">
                <CloseIcon />
              </div>
            </div>
            <div className="pl-6 pr-6 pb-6">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`https://anotaai-eight.vercel.app/comanda/123e4567-e89b-12d3-a456-426655440000`}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
