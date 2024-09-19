"use client";

import { useState, useRef, useEffect } from "react";
import { Loading } from "../components/Loading";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Acordion } from "../components/Acordion";
import QRCode from "react-qr-code";
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { currency, subTotal } from "../utils/currency";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PinIcon from "@mui/icons-material/Pin";
import { CantosTopBot, CantosBotTop, CantosTop, CantosBot } from "../components/Cantos";
import { getListItems, getOrder, postComanda } from "../server";
import { DivFocus } from "../components/organismo/Focus";
import Link from "next/link";

export default function Comanda({ searchParams }) {
  const orderID = searchParams.orderid;
  const createOrderID = searchParams.createorderid;
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState("");
  const [numTotalItems, setNumTotalItems] = useState(0);
  const [exibirListaCompleta, setExibirListaCompleta] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const [isModalQRCodeOpen, setIsModalQRCodeOpen] = useState(false);
  const [itemsSelecionados, setItemsSelecionados] = useState({});
  const [showItemsSelecionados, setShowItemsSelecionados] = useState(false);
  const [search, setSearch] = useState("");
  const [listaSelecaoItems, setListaSelecaoItems] = useState([]);
  const [isLoadinglistaSelecaoItems, setIsLoadingListaSelecaoItems] =
    useState(true);
  const [isTextKeyboard, setTextKeyboard] = useState(false);
  const [listDeItensAdicionados, setListDeItensAdicionados] = useState({
    records: [],
  });
  const [order, setOrder] = useState({ records: [] });
  const textFieldRef = useRef(null);

  const [modelOpen, setModelOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({});
  const handleKeyboard = () => {
    setTextKeyboard(!isTextKeyboard);

    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const handleListDeItensAdicionados = () => {
    alert('Em contrução...')
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleItemsSelecionados = (item) => {
    setItemsSelecionados((nextValue) => {
      const result = { ...nextValue, ...item };
      const allItems = [];

      for (const category in result) {
        allItems.push(...Object.values(result[category]));
      }

      setNumTotalItems(
        Object.values(result).reduce((total, item) => total.quant + item, 0)
      );
      setListDeItensAdicionados({ records: allItems });
      return result;
    });
  };

  const get = (params) => {
    setIsLoadingOrder(true);
    getOrder(params)
      .then((response) => {
        setOrder(response);
      })
      .finally(() => {
        setIsLoadingOrder(false);
      });
  };

  const post = (params) => {
    setIsLoadingOrder(true);
    postComanda(params)
      .then((response) => {
        setOrder(response);
      })
      .finally(() => {
        setIsLoadingOrder(false);
      });
  };

  useEffect(() => {
    if(orderID || createOrderID){
      if (orderID) {
        get(orderID);
      }
      if (createOrderID) {
        post(createOrderID);
      }
    } else {
      setIsLoadingOrder(false);
    }

    getListItems()
      .then((response) => {
        setExpanded(response[0].id);
        setListaSelecaoItems(response);
      })
      .finally(() => {
        setIsLoadingListaSelecaoItems(false);
      });
  }, []);

  return !exibirListaCompleta ? (
    <div className="flex flex-col h-screen">
      <div
        id="Top-Flutuante"
        className="fixed inset-x-0 top-0 h-[144px] w-full bg-black z-50"
      >
        <div className="grid grid-cols-10 gap-2 p-1 pb-2 rounded">
          <div className="col-span-3">
            <div className="text-white text-xs">
              <strong>Comanda</strong>
            </div>
            <Link 
            href="/selecao-de-comanda"
            className="flex justify-center  text-white items-center text-6xl h-16 border-solid rounded border-2">
              {isLoadingOrder ? (
                <Loading color="white" />
              ) : order?.id ? (
                order.id ? order.id : "..."
              ) : (
                "..."
              )}
            </Link>
          </div>
          <div className="col-span-5">
            <div className="text-xs text-white">
              <strong>Informações</strong>
            </div>
            <div className="flex h-16 border-solid rounded border-2 bg-gray-300">
              <div className="flex w-full flex-col p-1 justify-start">
                <div className="text-xs">Aberta: 10:20</div>
                <div className="text-xs">Atualização: 01:30</div>
              </div>
            </div>
          </div>
          <div
            className="col-span-2"
            onClick={() => setExibirListaCompleta(true)}
          >
            <div className="text-xs">.</div>
            <div className="flex justify-center items-center text-2xl h-16 border-solid rounded border-2">
              <ViewHeadlineIcon
                sx={{ height: "50px", width: "50px", color: "white" }}
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <CantosTop />

          <div className={`flex gap-2 p-1 pt-2 bg-white ${!showItemsSelecionados ? "white" : "#DDD"}`}>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
              inputRef={textFieldRef}
              size="small"
              placeholder="Busca"
              sx={ {
                backgroundColor: !showItemsSelecionados ? "white" : "#DDD",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                  sx={{ marginLeft: '-7px' }}
                   position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    onClick={() => handleKeyboard()}
                    sx={{ marginRight: '-5px' }}
                    position="end"
                  >
                    {isTextKeyboard ? <KeyboardIcon /> : <PinIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{
                sx: {
                  backgroundColor: !showItemsSelecionados ? "white" : "#DDD",
                  borderRadius: "4px",
                  border: "none",
                },
                inputMode: isTextKeyboard ? "numeric" : "text",
                type: "search",
                autoComplete: "off",
                autoCorrect: "off",
                autoCapitalize: "off",
                spellCheck: "false",
              }}
              disabled={showItemsSelecionados}
            />

            <button
              className="px-4 h-10 w-[60px]  bg-slate-950 text-white rounded"
              onClick={() => setShowItemsSelecionados(!showItemsSelecionados)}
            >
              {showItemsSelecionados ? (
                <ContentPasteSearchIcon />
              ) : (
                 
                <AssignmentOutlinedIcon />
              )}
            </button>
            
          </div>
        </div>
      </div>

      <div
        id="Bot-Flutuante"
        className="fixed inset-x-0 bottom-0 w-full h-[100px]  z-50"
      >
        <div className="w-full px-[20px] pb-[8px]">
        <button
          onClick={handleListDeItensAdicionados}
          className={`px-4 flex py-2 items-center justify-center w-full border-inherit shadow-lg text-white rounded ${
            !numTotalItems
              ? "bg-gray-300 cursor-not-allowed "
              : "bg-slate-950 border-inherit shadow-lg"
          }`}
          disabled={!numTotalItems}
        >
          Enviar para comanda
        </button>
        </div>
          <div className="relative">
          <CantosBot />
          </div>
        <div className="bg-black h-full">
          menu
        </div>
      </div>

      <div className="flex-grow pt-[140px] pb-[105px]">
        {isLoadinglistaSelecaoItems ? (
          <div className="flex-grow  h-full flex justify-center items-center ">
            <Loading color="black" />
          </div>
        ) : (
          <div>
            {listaSelecaoItems.map((i) => (
              <Acordion
                i={i}
                key={i.id}
                handleChange={handleChange}
                expanded={expanded}
                handleItemsSelecionados={handleItemsSelecionados}
                itemsSelecionados={itemsSelecionados}
                search={search}
                showItemsSelecionados={showItemsSelecionados}
                setInfoModal={setInfoModal}
                setModelOpen={setModelOpen}
              />
            ))}
          </div>
        )}
      </div>
      {modelOpen && <div
          id="modal"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-1">
            {infoModal.label}
            </h2>
            <div className="border-2 p-2 rounded-md border-slate-300 mb-4">
            <p className="">Esse modal tem o intuido de informar a descrição do item</p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModelOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>}
    </div>
  ) : (
    <div className="flex flex-col h-screen">
      <div
        id="Top-Flutuante"
        className="fixed inset-x-0 top-0 h-[130px] w-full bg-black z-50"
      >
        <div className="grid grid-cols-10 gap-2 p-1 rounded">
          <div className="col-span-3">
            <div className="text-white text-xs">
              <strong>Comanda</strong>
            </div>
            <Link 
            href="/selecao-de-comanda"
            className="flex justify-center  text-white items-center text-6xl h-16 border-solid rounded border-2">
              {isLoadingOrder ? (
                <Loading color="white" />
              ) : order?.id ? (
                order.id ? order.id : "..."
              ) : (
                "..."
              )}
            </Link>
          </div>
          <div className="col-span-5">
            <div className="text-white text-xs">
              <strong>Informações</strong>
            </div>
            <div className="flex h-16 border-solid rounded border-2 bg-gray-300">
              <div className="flex w-full flex-col p-1 justify-start">
                <div className="text-xs">Aberta: 10:20</div>
                <div className="text-xs">Atualização: 01:30</div>
              </div>
            </div>
          </div>
          <div
            className="col-span-2"
            onClick={() => setExibirListaCompleta(false)}
          >
            <div className="text-xs">.</div>
            <div className="flex justify-center items-center text-2xl h-16 border-solid rounded border-2">
              <CloseIcon
                sx={{ height: "50px", width: "50px", color: "white" }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-8 mx-1 gap-2 bg-black rounded border-b border-black">
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
        <CantosTopBot />
      </div>

      <div
        id="Bot-Flutuante"
        className="fixed inset-x-0 bottom-0 w-full h-[89px] z-50"
      >
        <CantosBotTop />
        <div className="fixed inset-x-0 bottom-0 w-full pt-2 px-2 pb-4 bg-black shadow-sm ">
          <div className="flex flex-row justify-end ">
            <div className=" flex flex-row rounded bg-black p-2 border-2 border-b-white">
              <div className="mr-2 text-3xl text-white">
                <strong>
                  <p>SUBTOTAL:</p>
                </strong>
              </div>
              <div className="min-w-20 text-3xl text-white shadow-lg">
                <strong>
                  {currency(
                    subTotal(listDeItensAdicionados.records, order.records)
                  )}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-white pt-[125px]  pb-[30px] rounded-lg border-t-4 border-black">
        {isLoading ? (
          <div className="flex-grow  h-full flex justify-center items-center">
            <Loading color="black" />
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 pb-20 px-2 ">
              {order.records.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-8 border-2 backdrop-blur-sm border-l-black border-l-4 rounded-md shadow-lg mt-1"
                >
                  <div className="flex items-center justify-center col-span-1 h-10">
                    <p>{item.quant}</p>
                  </div>
                  <div className="flex items-center col-span-5">
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                  </div>
                  <div className="flex items-center col-span-2 ">
                    <p>{currency(item.price)}</p>
                  </div>
                </div>
              ))}
              {listDeItensAdicionados.records
                .filter((item) => item.quant)
                .map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-8 border-2 backdrop-blur-sm border-l-blue-500 border-l-4 rounded-md shadow-lg mt-1"
                  >
                    <div className="flex items-center justify-center col-span-1 h-10">
                      <p>{item.quant}</p>
                    </div>
                    <div className="flex items-center col-span-5">
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                    </div>
                    <div className="flex items-center col-span-2 ">
                      <p>{currency(item.price)}</p>
                    </div>
                  </div>
                ))}
              <DivFocus />
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={`https://anotaai-eight.vercel.app/comanda/123e4567-e89b-12d3-a456-426655440000`}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
