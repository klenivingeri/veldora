import { itemsDaComanda } from '../constants/data'
export default class Comanda {
  constructor(){
    
  }


  async getComanda(params) {
    console.log(params)
    return itemsDaComanda
  }
}