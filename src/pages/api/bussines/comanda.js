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
    const maxComanda = Array.from({ length: 30 }, (_, i) => ({label: `${i + 1}`}))
    const labelsID = allComandas.map(c => c.label)
    const off = maxComanda.filter(c => !labelsID.includes(c.label))

    return {on:allComandas , off}
  }
}