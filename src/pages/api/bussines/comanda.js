import { itemsDaComanda, allComandas, comandaVazia } from '../constants/data'
export default class Comanda {
  constructor(){
    
  }

  async getComanda(params) {
    return itemsDaComanda(params)
  }

  async postComanda(id) {
    console.log('aaa',id)
    return comandaVazia(id)
  }

  async getAllComandas() {
    console.log('chamei arquivo all')

    return allComandas
  }
}