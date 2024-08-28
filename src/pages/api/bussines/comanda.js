export default class Comanda {
  constructor(){
    this.comanda = [
      {
        id: "1",
        name: "City of God",
        price: 20,
        quant: 1,
      },
      {
        id: "2",
        name: "Se7en",
        price: 1.5,
        quant: 1,
      },
      {
        id: "3",
        name: "The Silence of the Lambs",
        price: 11,
        quant: 1,
      },
      {
        id: "4",
        name: "It's a Wonderful Life",
        price: 4.6,
        quant: 1,
      },
      {
        id: "5",
        name: "Life Is Beautiful",
        price: 9.7,
        quant: 1,
      },
      {
        id: "6",
        name: "The Usual Suspects",
        price: 95,
        quant: 1,
      },
      {
        id: "7",
        name: "Léon: The Professional",
        price: 199,
        quant: 1,
      },
      {
        id: "8",
        name: "Spirited Away",
        price: 1,
        quant: 1,
      },
      {
        id: "9",
        name: "Saving Private Ryan",
        price: 18,
        quant: 1,
      },
      {
        id: "10",
        name: "Once Upon a Time in the West Once Upon a Time in the West",
        price: 6.8,
        quant: 1,
      },
      {
        id: "11",
        name: "American History X",
        price: 98,
        quant: 1,
      },
      {
        id: "12",
        name: "Interstellar",
        price: 14,
        quant: 1,
      },
      {
        id: "13",
        name: "Casablanca",
        price: 12,
        quant: 1,
      },
      {
        id: "14",
        name: "City Lights",
        price: 11,
        quant: 1,
      },
      {
        id: "15",
        name: "Psycho",
        price: 19.6,
        quant: 1,
      },
      {
        id: "16",
        name: "The Green Mile",
        price: 199,
        quant: 1,
      },
      {
        id: "17",
        name: "The Intouchables",
        price: 20.11,
        quant: 1,
      },
      {
        id: "18",
        name: "Modern Times",
        price: 19.36,
        quant: 1,
      },
    ];
  }


  async getComanda(params) {
    console.log(params)
    return this.comanda
  }
}