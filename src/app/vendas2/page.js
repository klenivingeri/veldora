"use client";

import { useState } from "react";
import { Loading } from "../components/Loading";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Acordion } from "../components/Acordion";
import QRCode from "react-qr-code";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { currency, subTotal } from "../utils/currency";
import CloseIcon from "@mui/icons-material/Close";
const items = [
  {
    id: "fritos",
    label: "Fritos",
    items: [
      {
        id: "001",
        name: "Pastel de carne",
        price: 20,
      },
      {
        id: "002",
        name: "Pastel de queijo",
        price: 1.5,
      },
      {
        id: "003",
        name: "Pastel de pizza",
        price: 11,
      },
      {
        id: "004",
        name: "Pastel de carne com queijo",
        price: 4.6,
      },
      {
        id: "005",
        name: "Pastel de Palmito",
        price: 9.7,
      },
    ],
  },
  {
    id: "crus",
    label: "Crus",
    items: [
      {
        id: "011",
        name: "Coxinha",
        price: 98,
      },
      {
        id: "012",
        name: "Coxinha Cremosa",
        price: 14,
      },
      {
        id: "013",
        name: "Espeto de frango",
        price: 12,
      },
      {
        id: "014",
        name: "Kibe de carne",
        price: 11,
      },
      {
        id: "015",
        name: "Kibe de queijo",
        price: 19.6,
      },
      {
        id: "016",
        name: "Kibe de catupiry",
        price: 199,
      },
    ],
  },
  {
    id: "assados",
    label: "Assados",
    items: [
      {
        id: "006",
        name: "Esfirra assada",
        price: 95,
      },
      {
        id: "007",
        name: "Pão pizza assado",
        price: 199,
      },
      {
        id: "008",
        name: "Hamburgues de cheddar",
        price: 1,
      },
      {
        id: "009",
        name: "Hamburger de catupity",
        price: 18,
      },
      {
        id: "010",
        name: "Hamburgues especial",
        price: 6.8,
      },
      {
        id: "017",
        name: "Torta",
        price: 20.11,
      },
      {
        id: "018",
        name: "Torta de Frango",
        price: 19.36,
      },
    ],
  },
  {
    id: "refrigerantes",
    label: "Refrigerantes",
    items: [
      {
        id: "019",
        name: "Coca cola 1lt",
        price: 19.36,
      },
      {
        id: "020",
        name: "Coca cola 2lt",
        price: 19.36,
      },
      {
        id: "021",
        name: "Fanta 1.5lt",
        price: 1.36,
      },
      {
        id: "0254",
        name: "Coca cola 350ml",
        price: 19.36,
      },
      {
        id: "0215",
        name: "Fanta 350ml",
        price: 1.36,
      },
    ],
  },
  {
    id: "sucos",
    label: "Sucos",
    items: [
      {
        id: "022",
        name: "Suco de laranja 300ml",
        price: 19.3,
      },
      {
        id: "023",
        name: "Suco laranja jarra 1lt",
        price: 19.6,
      },
      {
        id: "0242",
        name: "Suco de maracuja 300ml",
        price: 19.3,
      },
      {
        id: "0263",
        name: "Suco maracuja jarra 1lt",
        price: 19.6,
      },
      {
        id: "0282",
        name: "Suco de limão 300ml",
        price: 19.3,
      },
      {
        id: "0239",
        name: "Suco limão jarra 1lt",
        price: 19.6,
      },
      {
        id: "0202",
        name: "Suco de melancia 300ml",
        price: 19.3,
      },
      {
        id: "0923",
        name: "Suco melancia jarra 1lt",
        price: 19.6,
      },
    ],
  },
  {
    id: "vitaminas",
    label: "Vitaminas",
    items: [
      {
        id: "024",
        name: "Vitamina de Morango",
        price: 1.36,
      },
      {
        id: "025",
        name: "Vitamina de abacaxi",
        price: 1.3,
      },
      {
        id: "026",
        name: "Vitamina Goiaba",
        price: 9.6,
      },
      {
        id: "027",
        name: "Vitamina Mamão",
        price: 8.6,
      },
      {
        id: "124",
        name: "Vitamina de Limão",
        price: 1.36,
      },
      {
        id: "125",
        name: "Vitamina de Uva",
        price: 1.3,
      },
      {
        id: "126",
        name: "Vitamina Maracuja",
        price: 9.6,
      },
      {
        id: "127",
        name: "Vitamina Cenora",
        price: 8.6,
      },
    ],
  },
];

export default function Help() {
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(items[0].id);
  const [numTotalItems, setNumTotalItems] = useState(0);
  const [exibirListaCompleta, setExibirListaCompleta] = useState(false);
  const [isLoadingComanda, setIsLoadingComanda] = useState(false);
  const [isModalQRCodeOpen, setIsModalQRCodeOpen] = useState(false);
  const [itemsSelecionados, setItemsSelecionados] = useState({})
  const [listDeItensAdicionados, setListDeItensAdicionados] = useState({
    records: [],
  });

  const handleListDeItensAdicionados = () => {
    const allItemsArray = Object.values(newItems);

    setListDeItensAdicionados({ records: allItemsArray });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleItemsSelecionados = (item) => {
    setItemsSelecionados((nextValue) => {
      const result = {...nextValue, ...item}
      const allItems = [];

      for (const category in result) {
        allItems.push(...Object.values(result[category]));
      }

      setNumTotalItems(
        Object.values(result).reduce((total, item) => total.quant + item, 0)
      );
      setListDeItensAdicionados({ records: allItems })
      return result
    })
  }
  console.log(listDeItensAdicionados)
  return !exibirListaCompleta ? (
    <div className="flex flex-col h-screen">
      <div
        id="Top-Flutuante"
        className="fixed inset-x-0 top-0 h-[150px] w-full bg-gray-400 z-50"
      >
        <div id="History-Back" className="flex w-full flex-row  h-[45px]">
          <div
            className="flex  h-full justify-center items-center w-[60px] "
            onClick={() => back()}
          >
            <ArrowBackIosNewIcon />
          </div>
          <div className="flex h-full w-full justify-center items-center">
            <strong className="pr-[80px]">COMANDA</strong>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4 p-2 rounded">
          <div className="col-span-2">
            <div className="flex justify-center items-center text-6xl h-20 border-solid rounded border-2">
              75
            </div>
          </div>
          <div className="col-span-3">
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
          <div
            className="col-span-2"
            onClick={() => setExibirListaCompleta(true)}
          >
            <div className="flex justify-center items-center text-2xl h-20 border-solid rounded border-2">
              <ManageSearchIcon sx={{ height: "50px", width: "50px" }} />
            </div>
          </div>
        </div>
      </div>

      <div
        id="Bot-Flutuante"
        className="fixed inset-x-0 bottom-0 w-full h-[100px] bg-gray-400 z-50"
      >
        <button
          onClick={handleListDeItensAdicionados}
          className={`px-4 flex py-2 items-center justify-center w-full border-inherit shadow-lg text-white rounded ${
            !numTotalItems
              ? "bg-gray-400 cursor-not-allowed "
              : "bg-slate-950 border-inherit shadow-lg"
          }`}
          disabled={!numTotalItems}
        >
          Enviar para comanda
        </button>
      </div>

      <div className="flex-grow bg-gray-300 py-[150px]">
        {isLoading ? (
          <div className="flex-grow  h-full flex justify-center items-center ">
            <Loading color="black" />
          </div>
        ) : (
          <div>
            {items.map((i) => (
              <Acordion
                i={i}
                key={i.id}
                handleChange={handleChange}
                expanded={expanded}
                handleItemsSelecionados={handleItemsSelecionados}
                itemsSelecionados={itemsSelecionados}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col h-screen">
      <div
        id="Top-Flutuante"
        className="fixed inset-x-0 top-0 h-[150px] w-full bg-gray-400 z-50"
      >
        <div id="History-Back" className="flex w-full flex-row  h-[45px]">
          <div
            className="flex h-full justify-center items-center w-[60px] "
            onClick={() => setExibirListaCompleta(false)}
          >
            <ArrowBackIosNewIcon />
          </div>
          <div className="flex h-full w-full justify-center items-center">
            <strong className="pr-[80px]">COMANDA</strong>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4 p-2 rounded">
          <div className="col-span-2">
            <div className="flex justify-center items-center text-6xl h-20 border-solid rounded border-2">
              75
            </div>
          </div>
          <div className="col-span-3">
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
          <div
            className="col-span-2"
            onClick={() => setExibirListaCompleta(true)}
          >
            <div
              className="flex justify-center items-center text-6xl h-20"
              onClick={() => setIsModalQRCodeOpen(!isModalQRCodeOpen)}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "75px", width: "75px" }}
                value={"aaaa"}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        id="Bot-Flutuante"
        className="fixed inset-x-0 bottom-0 w-full h-[100px] bg-gray-400 z-50"
      >
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
      </div>

      <div className="flex-grow bg-gray-300 py-[150px]">
        {isLoading ? (
          <div className="flex-grow  h-full flex justify-center items-center ">
            <Loading color="black" />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 pb-20 mx-2 ">
              {listDeItensAdicionados.records.filter((item) => item.quant)
              .map((item) => (
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
